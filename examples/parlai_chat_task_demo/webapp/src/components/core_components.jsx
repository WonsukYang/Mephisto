/*
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from "react";
import ReactDOM from "react-dom";
import {
  FormControl,
  Button,
  ButtonGroup,
  InputGroup,
  FormGroup,
  MenuItem,
  DropdownButton,
  Badge,
  Popover,
  Overlay,
  Nav,
  NavItem,
  Col,
  ControlLabel,
  Form,
} from "react-bootstrap";
import Slider from "rc-slider";
import $ from "jquery";
import { CONNECTION_STATUS } from "mephisto-task";

import "rc-slider/assets/index.css";

class ChatMessage extends React.Component {
  render() {
    const { is_self, duration, agent_id, message } = this.props;

    let float_loc = "left";
    let alert_class = "alert-warning";
    if (is_self) {
      float_loc = "right";
      alert_class = "alert-info";
    }
    let duration = null;
    if (duration !== undefined) {
      let duration_seconds = Math.floor(duration / 1000) % 60;
      let duration_minutes = Math.floor(duration / 60000);
      let min_text = duration_minutes > 0 ? duration_minutes + " min" : "";
      let sec_text = duration_seconds > 0 ? duration_seconds + " sec" : "";
      duration_text = (
        <small>
          <br />
          <i>Duration: </i>
          {min_text + " " + sec_text}
        </small>
      );
    }
    return (
      <div className={"row"} style={{ marginLeft: "0", marginRight: "0" }}>
        <div
          className={"alert " + alert_class}
          role="alert"
          style={{ float: float_loc, display: "table" }}
        >
          <span style={{ fontSize: "16px", whiteSpace: "pre-wrap" }}>
            <b>{agent_id}</b>: {message}
          </span>
          {duration_text}
        </div>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const {
      agent_id,
      messages,
      onClickMessage,
      displayNames,
      is_review,
    } = this.props;

    // Handles rendering messages from both the user and anyone else
    // on the thread - agent_ids for the sender of a message exist in
    // the m.id field.
    if (typeof onClickMessage !== "function") {
      onClickMessage = (idx) => {
        alert("You've clicked on message number: " + idx);
      };
    }
    return (
      <div id="message_thread" style={{ width: "100%" }}>
        {messages.map((m, idx) => (
          <div
            key={m.message_id + "-" + idx}
            onClick={() => onClickMessage(idx)}
          >
            <ChatMessage
              is_self={m.id == agent_id || m.id in displayNames}
              agent_id={m.id in displayNames ? displayNames[m.id] : m.id}
              message={m.text}
              task_data={m.task_data}
              message_id={m.message_id}
              duration={is_review ? m.duration : undefined}
            />
          </div>
        ))}
      </div>
    );
  }
}

function ConnectionIndicator({ connection_status }) {
  let indicator_style = {
    opacity: "1",
    fontSize: "11px",
    color: "white",
    float: "right",
  };
  let text = "";
  switch (connection_status) {
    case CONNECTION_STATUS.CONNECTED:
      indicator_style["background"] = "#5cb85c";
      text = "connected";
      break;
    case CONNECTION_STATUS.RECONNECTING_ROUTER:
      indicator_style["background"] = "#f0ad4e";
      text = "reconnecting to router";
      break;
    case CONNECTION_STATUS.RECONNECTING_SERVER:
      indicator_style["background"] = "#f0ad4e";
      text = "reconnecting to server";
      break;
    case CONNECTION_STATUS.DISCONNECTED_SERVER:
    case CONNECTION_STATUS.DISCONNECTED_ROUTER:
    default:
      indicator_style["background"] = "#d9534f";
      text = "disconnected";
      break;
  }

  return (
    <button
      id="connected-button"
      className="btn btn-lg"
      style={indicator_style}
      disabled={true}
    >
      {text}
    </button>
  );
}

class VolumeControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slider_shown: false };
  }

  render() {
    const { volume, onVolumeChange } = this.props;

    let volume_control_style = {
      opacity: "1",
      fontSize: "11px",
      color: "white",
      float: "right",
      marginRight: "10px",
    };

    let slider_style = {
      height: 26,
      width: 150,
      marginRight: 14,
      float: "left",
    };

    let content = null;
    if (this.state.slider_shown) {
      content = (
        <div style={volume_control_style}>
          <div style={slider_style}>
            <Slider
              onChange={(v) => onVolumeChange(v / 100)}
              style={{ marginTop: 10 }}
              defaultValue={volume * 100}
            />
          </div>
          <Button onClick={() => this.setState({ slider_shown: false })}>
            <span
              style={{ marginRight: 5 }}
              className="glyphicon glyphicon-remove"
            />
            Hide Volume
          </Button>
        </div>
      );
    } else {
      content = (
        <div style={volume_control_style}>
          <Button onClick={() => this.setState({ slider_shown: true })}>
            <span
              className="glyphicon glyphicon glyphicon-volume-up"
              style={{ marginRight: 5 }}
              aria-hidden="true"
            />
            Volume
          </Button>
        </div>
      );
    }
    return content;
  }
}

class ChatBox extends React.Component {
  state = {
    hidden: true,
    msg: "",
  };

  smoothlyAnimateToBottom() {
    if (this.bottomAnchorRef) {
      this.bottomAnchorRef.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }

  instantlyJumpToBottom() {
    if (this.chatContainerRef) {
      this.chatContainerRef.scrollTop = this.chatContainerRef.scrollHeight;
    }
  }

  componentDidMount() {
    this.instantlyJumpToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    // Use requestAnimationFrame to defer UI-based updates
    // until the next browser paint
    if (prevState.hidden === true && this.state.hidden === false) {
      requestAnimationFrame(() => {
        this.instantlyJumpToBottom();
      });
    } else if (prevProps.off_chat_messages !== this.props.off_chat_messages) {
      requestAnimationFrame(() => {
        this.smoothlyAnimateToBottom();
      });
    }
  }

  // TODO: Replace with enhanced logic to determine if the
  // chat message belongs to the current user.
  isOwnMessage = (message) => message.owner === 0;

  render() {
    const unreadCount = this.props.has_new_message;
    const messages = this.props.off_chat_messages || [];

    return (
      <div style={{ float: "right", marginRight: 7 }}>
        <Button
          onClick={() => this.setState({ hidden: !this.state.hidden })}
          ref={(el) => {
            this.buttonRef = el;
          }}
        >
          Chat Messages&nbsp;
          {!!unreadCount && (
            <Badge style={{ backgroundColor: "#d9534f", marginLeft: 3 }}>
              {unreadCount}
            </Badge>
          )}
        </Button>

        <Overlay
          rootClose
          show={!this.state.hidden}
          onHide={() => this.setState({ hidden: true })}
          placement="bottom"
          target={this.buttonRef}
        >
          <Popover id="chat_messages" title={"Chat Messages"}>
            <div
              className="chat-list"
              ref={(el) => {
                this.chatContainerRef = el;
              }}
              style={{ minHeight: 300, maxHeight: 300, overflowY: "scroll" }}
            >
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: this.isOwnMessage(message) ? "right" : "left",
                  }}
                >
                  <div
                    style={{
                      borderRadius: 4,
                      marginBottom: 10,
                      padding: "5px 10px",
                      display: "inline-block",
                      ...(this.isOwnMessage(message)
                        ? {
                            marginLeft: 20,
                            textAlign: "right",
                            backgroundColor: "#dff1d7",
                          }
                        : {
                            marginRight: 20,
                            backgroundColor: "#eee",
                          }),
                    }}
                  >
                    {message.msg}
                  </div>
                </div>
              ))}
              <div
                className="bottom-anchor"
                ref={(el) => {
                  this.bottomAnchorRef = el;
                }}
              />
            </div>
            <form
              style={{ paddingTop: 10 }}
              onSubmit={(e) => {
                e.preventDefault();
                if (this.state.msg === "") return;
                this.props.onMessageSend(this.state.msg);
                this.setState({ msg: "" });
              }}
            >
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.msg}
                    onChange={(e) => this.setState({ msg: e.target.value })}
                  />
                  <InputGroup.Button>
                    <Button
                      className="btn-primary"
                      disabled={this.state.msg === ""}
                      type="submit"
                    >
                      Send
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
          </Popover>
        </Overlay>
      </div>
    );
  }
}

class ChatNavbar extends React.Component {
  state = {
    // TODO: replace hardcoded initial chat state with some API integration
    chat: [
      { msg: "hey", owner: 3 },
      { msg: "anyone else there?", owner: 3 },
    ],
  };

  render() {
    // const displayChatBox = true;
    const displayChatBox = this.props.displayChatBox || false;
    let nav_style = {
      position: "absolute",
      backgroundColor: "#EEEEEE",
      borderColor: "#e7e7e7",
      height: 46,
      top: 0,
      borderWidth: "0 0 1px",
      borderRadius: 0,
      right: 0,
      left: 0,
      zIndez: 1030,
      padding: 5,
    };
    return (
      <div style={nav_style}>
        <ConnectionIndicator connection_status={this.props.connection_status} />
        <VolumeControl
          volume={this.props.volume}
          onVolumeChange={this.props.onVolumeChange}
        />
        {displayChatBox && (
          <ChatBox
            off_chat_messages={this.state.chat}
            onMessageSend={(msg) =>
              this.setState({ chat: [...this.state.chat, { msg, owner: 0 }] })
            }
            has_new_message={2}
          />
        )}
      </div>
    );
  }
}

function Hourglass() {
  // TODO animate?
  return (
    <div
      id="hourglass"
      style={{
        marginTop: "-1px",
        marginRight: "5px",
        display: "inline",
        float: "left",
      }}
    >
      <span className="glyphicon glyphicon-hourglass" aria-hidden="true" />
    </div>
  );
}

function WaitingMessage({ agent_status }) {
  let message_style = {
    float: "left",
    display: "table",
    backgroundColor: "#fff",
  };
  let text = "Waiting for the next person to speak...";
  if (agent_status === "waiting") {
    text = "Waiting to pair with a task...";
  }
  return (
    <div
      id="waiting-for-message"
      className="row"
      style={{ marginLeft: "0", marginRight: "0" }}
    >
      <div className="alert alert-warning" role="alert" style={message_style}>
        <Hourglass />
        <span style={{ fontSize: "16px" }}>{text}</span>
      </div>
    </div>
  );
}

class ChatPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chat_height: this.getChatHeight() };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.message_count != prevProps.message_count) {
      $("div#message-pane-segment").animate(
        {
          scrollTop: $("div#message-pane-segment").get(0).scrollHeight,
        },
        500
      );
    }
  }

  getChatHeight() {
    let entry_pane = $("div#right-bottom-pane").get(0);
    let bottom_height = 90;
    if (entry_pane !== undefined) {
      bottom_height = entry_pane.scrollHeight;
    }
    return this.props.task_config.frame_height - bottom_height;
  }

  handleResize() {
    if (this.getChatHeight() != this.state.chat_height) {
      this.setState({ chat_height: this.getChatHeight() });
    }
  }

  render() {
    // TODO move to CSS
    let top_pane_style = {
      width: "100%",
      position: "relative",
      height: this.state.chat_height + "px",
    };

    let chat_style = {
      width: "100%",
      height: this.state.chat_height + "px",
      paddingTop: "60px",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingBottom: "20px",
      overflowY: "scroll",
    };

    window.setTimeout(() => {
      this.handleResize();
    }, 10);

    let wait_message = null;
    // console.log('Should be making waiting message?');
    // console.log(this.props);
    if (this.props.chat_state == "waiting") {
      wait_message = <WaitingMessage agent_status={this.props.agent_status} />;
    }

    return (
      <div id="right-top-pane" style={top_pane_style}>
        <ChatNavbar {...this.props} />
        <div id="message-pane-segment" style={chat_style}>
          <MessageList {...this.props} />
          {wait_message}
        </div>
      </div>
    );
  }
}

class IdleResponse extends React.Component {
  render() {
    return <div id="response-type-idle" className="response-type-module" />;
  }
}

class ReviewButtons extends React.Component {
  GOOD_REASONS = ["Not specified", "Interesting/Creative", "Other"];

  BAD_REASONS = [
    "Not specified",
    "Didn't understand task",
    "Bad grammar/spelling",
    "Total nonsense",
    "Slow responder",
    "Other",
  ];

  RATING_VALUES = [1, 2, 3, 4, 5];

  RATING_TITLES = [
    "Terrible",
    "Bad",
    "Average/Good",
    "Great",
    "Above and Beyond",
  ];

  constructor(props) {
    super(props);
    let init_state = props.init_state;
    if (init_state !== undefined) {
      this.state = init_state;
    } else {
      this.state = {
        current_rating: null,
        submitting: false,
        submitted: false,
        text: "",
        dropdown_value: "Not specified",
      };
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.onInputResize !== undefined) {
      this.props.onInputResize();
    }
  }

  render() {
    // Create basic button selector
    let current_rating = this.state.current_rating;
    let button_vals = this.RATING_VALUES;
    let rating_titles = this.RATING_TITLES;
    let buttons = button_vals.map((v) => {
      let use_style = "info";
      if (v < 3) {
        use_style = "danger";
      } else if (v > 3) {
        use_style = "success";
      }

      return (
        <Button
          onClick={() =>
            this.setState({
              current_rating: v,
              text: "",
              dropdown_value: "Not specified",
            })
          }
          bsStyle={current_rating == v ? use_style : "default"}
          disabled={this.state.submitting}
          key={"button-rating-" + v}
        >
          {rating_titles[v - 1]}
        </Button>
      );
    });

    // Dropdown and other only appear in some cases
    let dropdown = null;
    let other_input = null;
    let reason_input = null;
    if (current_rating != null && current_rating != 3) {
      let options = current_rating > 3 ? this.GOOD_REASONS : this.BAD_REASONS;
      let dropdown_vals = options.map((opt) => (
        <MenuItem
          key={"dropdown-item-" + opt}
          eventKey={opt}
          onSelect={(key) => this.setState({ dropdown_value: key, text: "" })}
        >
          {opt}
        </MenuItem>
      ));
      dropdown = (
        <DropdownButton
          dropup={true}
          componentClass={InputGroup.Button}
          title={this.state.dropdown_value}
          id={"review-dropdown"}
          disabled={this.state.submitting}
        >
          {dropdown_vals}
        </DropdownButton>
      );
    }

    // Create other text
    if (dropdown != null && this.state.dropdown_value == "Other") {
      // Optional input for if the  user says other
      other_input = (
        <FormControl
          type="text"
          placeholder="Enter reason (optional)"
          value={this.state.text}
          onChange={(t) => this.setState({ text: t.target.value })}
          disabled={this.state.submitting}
        />
      );
    }
    if (dropdown != null) {
      reason_input = (
        <div style={{ marginBottom: "8px" }}>
          Give a reason for your rating (optional):
          <InputGroup>
            {dropdown}
            {other_input}
          </InputGroup>
        </div>
      );
    }

    // Assemble flow components
    let disable_submit = this.state.submitting || current_rating == null;
    let review_flow = (
      <div>
        Rate your chat partner (fully optional & confidential):
        <br />
        <ButtonGroup>{buttons}</ButtonGroup>
        {reason_input}
        <div style={{ marginBottom: "8px" }}>
          <ButtonGroup style={{ marginBottom: "8px" }}>
            <Button
              disabled={disable_submit}
              bsStyle="info"
              onClick={() => {
                this.setState({ submitting: true });
                let feedback_data = {
                  rating: this.state.current_rating,
                  reason_category: this.state.dropdown_value,
                  reason: this.state.text,
                };
                this.props
                  .onMessageSend({
                    text: "[PEER_REVIEW]",
                    task_data: feedback_data,
                  })
                  .then(() => this.setState({ submitted: true }));
                this.props.onChoice(true);
              }}
            >
              {this.state.submitted ? "Submitted!" : "Submit Review"}
            </Button>
            <Button
              disabled={this.state.submitting}
              onClick={() => this.props.onChoice(false)}
            >
              Decline Review
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
    return review_flow;
  }
}

class DoneButton extends React.Component {
  // This component is responsible for initiating the click
  // on the mturk form's submit button.

  constructor(props) {
    super(props);
    this.state = {
      feedback_shown: this.props.display_feedback,
      feedback_given: null,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.onInputResize !== undefined) {
      this.props.onInputResize();
    }
  }

  render() {
    let review_flow = null;
    let done_button = (
      <button
        id="done-button"
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => this.props.allDoneCallback()}
      >
        <span className="glyphicon glyphicon-ok-circle" aria-hidden="true" />{" "}
        Done with this HIT
      </button>
    );
    if (this.props.display_feedback) {
      if (this.state.feedback_shown) {
        review_flow = (
          <ReviewButtons
            {...this.props}
            onChoice={(did_give) =>
              this.setState({
                feedback_shown: false,
                feedback_given: did_give,
              })
            }
          />
        );
        done_button = null;
      } else if (this.state.feedback_given) {
        review_flow = <span>Thanks for the feedback!</span>;
      }
    }
    return (
      <div>
        {review_flow}
        <div>{done_button}</div>
      </div>
    );
  }
}

class DoneResponse extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.onInputResize();
  }

  render() {
    const {
      agent_state: { done_text, task_done },
    } = this.props;

    let inactive_pane = null;
    if (done_text) {
      inactive_pane = (
        <span id="inactive" style={{ fontSize: "14pt", marginRight: "15px" }}>
          {done_text}
        </span>
      );
    }
    // TODO maybe move to CSS?
    let pane_style = {
      paddingLeft: "25px",
      paddingTop: "20px",
      paddingBottom: "20px",
      paddingRight: "25px",
      float: "left",
    };
    let done_button = <DoneButton {...this.props} />;
    if (!task_done) {
      done_button = null;
    }
    return (
      <div
        id="response-type-done"
        className="response-type-module"
        style={pane_style}
      >
        {inactive_pane}
        {done_button}
      </div>
    );
  }
}

class TextResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textval: "", sending: false };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Only change in the active status of this component should cause a
    // focus event. Not having this would make the focus occur on every
    // state update (including things like volume changes)
    if (this.props.active && !prevProps.active) {
      $("input#id_text_input").focus();
    }
    this.props.onInputResize();
  }

  tryMessageSend() {
    if (this.state.textval != "" && this.props.active && !this.state.sending) {
      this.setState({ sending: true });
      this.props
        .onMessageSend({ text: this.state.textval, task_data: {} })
        .then(() => this.setState({ textval: "", sending: false }));
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.tryMessageSend();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  }

  render() {
    // TODO maybe move to CSS?
    let pane_style = {
      paddingLeft: "25px",
      paddingTop: "20px",
      paddingBottom: "20px",
      paddingRight: "25px",
      float: "left",
      width: "100%",
    };
    let input_style = {
      height: "50px",
      width: "100%",
      display: "block",
      float: "left",
    };
    let submit_style = {
      width: "100px",
      height: "100%",
      fontSize: "16px",
      float: "left",
      marginLeft: "10px",
      padding: "0px",
    };

    let text_input = (
      <FormControl
        type="text"
        id="id_text_input"
        style={{
          width: "80%",
          height: "100%",
          float: "left",
          fontSize: "16px",
        }}
        value={this.state.textval}
        placeholder="Please enter here..."
        onKeyPress={(e) => this.handleKeyPress(e)}
        onChange={(e) => this.setState({ textval: e.target.value })}
        disabled={!this.props.active || this.state.sending}
      />
    );

    let submit_button = (
      <Button
        className="btn btn-primary"
        style={submit_style}
        id="id_send_msg_button"
        disabled={
          this.state.textval == "" || !this.props.active || this.state.sending
        }
        onClick={() => this.tryMessageSend()}
      >
        Send
      </Button>
    );

    return (
      <div
        id="response-type-text-input"
        className="response-type-module"
        style={pane_style}
      >
        <div style={input_style}>
          {text_input}
          {submit_button}
        </div>
      </div>
    );
  }
}

class FormResponse extends React.Component {
  // Provide a form-like interface to MTurk interface.

  constructor(props) {
    super(props);
    // At this point it should be assumed that task_data
    // has a field "respond_with_form"
    let responses = [];
    for (let _ of this.props.task_data["respond_with_form"]) {
      responses.push("");
    }
    this.state = { responses: responses, sending: false };
  }

  tryMessageSend() {
    let form_elements = this.props.task_data["respond_with_form"];
    let response_data = [];
    let response_text = "";
    let all_response_filled = true;
    for (let ind in form_elements) {
      let question = form_elements[ind]["question"];
      let response = this.state.responses[ind];
      if (response == "") {
        all_response_filled = false;
      }
      response_data.push({
        question: question,
        response: response,
      });
      response_text += question + ": " + response + "\n";
    }

    if (all_response_filled && this.props.active && !this.state.sending) {
      this.setState({ sending: true });
      this.props
        .onMessageSend({
          text: response_text,
          task_data: { form_responses: response_data },
        })
        .then(() => this.setState({ sending: false }));
      // clear answers once sent
      this.setState((prevState) => {
        prevState["responses"].fill("");
        return { responses: prevState["responses"] };
      });
    }
  }

  render() {
    let form_elements = this.props.task_data["respond_with_form"];
    const listFormElements = form_elements.map((form_elem, index) => {
      let question = form_elem["question"];
      if (form_elem["type"] == "choices") {
        let choices = [<option key="empty_option" />].concat(
          form_elem["choices"].map((option_label, index) => {
            return (
              <option key={"option_" + index.toString()}>{option_label}</option>
            );
          })
        );
        return (
          <FormGroup key={"form_el_" + index}>
            <Col
              componentClass={ControlLabel}
              sm={6}
              style={{ fontSize: "16px" }}
            >
              {question}
            </Col>
            <Col sm={5}>
              <FormControl
                componentClass="select"
                style={{ fontSize: "16px" }}
                value={this.state.responses[index]}
                onChange={(e) => {
                  var text = e.target.value;
                  this.setState((prevState) => {
                    let new_res = prevState["responses"];
                    new_res[index] = text;
                    return { responses: new_res };
                  });
                }}
              >
                {choices}
              </FormControl>
            </Col>
          </FormGroup>
        );
      }
      return (
        <FormGroup key={"form_el_" + index}>
          <Col
            style={{ fontSize: "16px" }}
            componentClass={ControlLabel}
            sm={6}
          >
            {question}
          </Col>
          <Col sm={5}>
            <FormControl
              type="text"
              style={{ fontSize: "16px" }}
              value={this.state.responses[index]}
              onChange={(e) => {
                var text = e.target.value;
                this.setState((prevState) => {
                  let new_res = prevState["responses"];
                  new_res[index] = text;
                  return { responses: new_res };
                });
              }}
            />
          </Col>
        </FormGroup>
      );
    });
    let submit_button = (
      <Button
        className="btn btn-primary"
        style={{ height: "40px", width: "100px", fontSize: "16px" }}
        id="id_send_msg_button"
        disabled={
          this.state.textval == "" || !this.props.active || this.state.sending
        }
        onClick={() => this.tryMessageSend()}
      >
        Send
      </Button>
    );

    return (
      <div
        id="response-type-text-input"
        className="response-type-module"
        style={{
          paddingTop: "15px",
          float: "left",
          width: "100%",
          backgroundColor: "#eeeeee",
        }}
      >
        <Form
          horizontal
          style={{ backgroundColor: "#eeeeee", paddingBottom: "10px" }}
        >
          {listFormElements}
          <FormGroup>
            <Col sm={6} />
            <Col sm={5}>{submit_button}</Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

class ResponsePane extends React.Component {
  render() {
    const { chat_state, task_data } = this.props;

    let response_pane = null;
    switch (chat_state) {
      case "done":
      case "inactive":
        response_pane = <DoneResponse {...this.props} />;
        break;
      case "text_input":
      case "waiting":
        if (task_data && task_data["respond_with_form"]) {
          response_pane = (
            <FormResponse {...this.props} active={chat_state == "text_input"} />
          );
        } else {
          response_pane = (
            <TextResponse {...this.props} active={chat_state == "text_input"} />
          );
        }
        break;
      case "idle":
      default:
        response_pane = <IdleResponse {...this.props} />;
        break;
    }

    return (
      <div
        id="right-bottom-pane"
        style={{ width: "100%", backgroundColor: "#eee" }}
      >
        {response_pane}
      </div>
    );
  }
}

class RightPane extends React.Component {
  handleResize() {
    if (this.chat_pane !== undefined) {
      if (this.chat_pane.handleResize !== undefined) {
        this.chat_pane.handleResize();
      }
    }
  }

  render() {
    // TODO move to CSS
    let right_pane = {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "spaceBetween",
    };

    return (
      <div id="right-pane" style={right_pane}>
        <ChatPane
          message_count={this.props.messages.length}
          {...this.props}
          ref={(pane) => {
            this.chat_pane = pane;
          }}
        />
        <ResponsePane
          {...this.props}
          onInputResize={() => this.handleResize()}
        />
      </div>
    );
  }
}

function CustomTaskDescription({ task_config, task_data }) {
  let header_text = task_config.chat_title;
  let task_desc = task_config.task_description || "Task Description Loading";
  return (
    <div>
      <h1>{header_text}</h1>
      <hr style={{ borderTop: "1px solid #555" }} />
      <h2>This is a custom Task Description loaded from a custom bundle</h2>
      <p>
        It has the ability to do a number of things, like directly access the
        contents of task data, view the number of messages so far, and pretty
        much anything you make like. We're also able to control other components
        as well, as in this example we've made it so that if you click a
        message, it will alert with that message idx.
      </p>
      <p>
        The current contents of task data are as follows:{" "}
        {JSON.stringify(task_data)}
      </p>
      <p>The regular task description content will now appear below:</p>
      <hr style={{ borderTop: "1px solid #555" }} />
      <span
        id="task-description"
        style={{ fontSize: "16px" }}
        dangerouslySetInnerHTML={{ __html: task_desc }}
      />
    </div>
  );
}

function ContextView({ task_data }) {
  const { task_data } = this.props;

  // TODO pull context title from templating variable
  let header_text = "Context";
  let context =
    "To render context here, write or select a ContextView " +
    "that can render your task_data, or write the desired " +
    "content into the task_data.html field of your act";
  if (task_data !== undefined && task_data.html !== undefined) {
    context = task_data.html;
  }
  return (
    <div>
      <h1>{header_text}</h1>
      <hr style={{ borderTop: "1px solid #555" }} />
      <span
        id="context"
        style={{ fontSize: "16px" }}
        dangerouslySetInnerHTML={{ __html: context }}
      />
    </div>
  );
}

class LeftPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current_pane: "instruction", last_update: 0 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.task_data.last_update !== undefined &&
      nextProps.task_data.last_update > prevState.last_update
    ) {
      return {
        current_pane: "context",
        last_update: nextProps.task_data.last_update,
      };
    } else return null;
  }

  render() {
    const { task_config, is_cover_page, children } = this.props;

    let frame_height = task_config.frame_height;
    let frame_style = {
      height: frame_height + "px",
      backgroundColor: "#dff0d8",
      padding: "30px",
      overflow: "auto",
    };
    let pane_size = is_cover_page ? "col-xs-12" : "col-xs-4";
    let has_context = false; // We'll be rendering context inline
    if (is_cover_page || !has_context) {
      return (
        <div id="left-pane" className={pane_size} style={frame_style}>
          <CustomTaskDescription {...this.props} />
          {children}
        </div>
      );
    } else {
      // In a 2 panel layout, we need to tabulate the left pane to be able
      // to display both context and instructions
      let nav_items = [
        <NavItem
          eventKey={"instruction"}
          key={"instruction-selector"}
          title={"Task Instructions"}
        >
          {"Task Instructions"}
        </NavItem>,
        <NavItem
          eventKey={"context"}
          key={"context-selector"}
          title={"Context"}
        >
          {"Context"}
        </NavItem>,
      ];
      let display_instruction = {
        backgroundColor: "#dff0d8",
        padding: "10px 20px 20px 20px",
        flex: "1 1 auto",
      };
      let display_context = {
        backgroundColor: "#dff0d8",
        padding: "10px 20px 20px 20px",
        flex: "1 1 auto",
      };
      if (this.state.current_pane == "context") {
        display_instruction.display = "none";
      } else {
        display_context.display = "none";
      }
      let nav_panels = [
        <div style={display_instruction} key={"instructions-display"}>
          <TaskDescription {...this.props} />
        </div>,
        <div style={display_context} key={"context-display"}>
          <ContextView {...this.props} />
        </div>,
      ];

      let frame_style = {
        height: frame_height + "px",
        backgroundColor: "#eee",
        padding: "10px 0px 0px 0px",
        overflow: "auto",
        display: "flex",
        flexFlow: "column",
      };

      return (
        <div id="left-pane" className={pane_size} style={frame_style}>
          <Nav
            bsStyle="tabs"
            activeKey={this.state.current_pane}
            onSelect={(key) => this.setState({ current_pane: key })}
          >
            {nav_items}
          </Nav>
          {nav_panels}
          {children}
        </div>
      );
    }
  }
}

function ContentLayout(props) {
  let layout_style = "2-PANEL"; // Currently the only layout style is 2 panel
  return (
    <div className="row" id="ui-content">
      <LeftPane {...props} layout_style={layout_style} />
      <RightPane {...props} layout_style={layout_style} />
    </div>
  );
}

function BaseFrontend(props) {
  const { is_cover_page, connection_status } = props;
  let content = null;
  if (is_cover_page) {
    content = (
      <div className="row" id="ui-content">
        <LeftPane {...this.props} />
      </div>
    );
  } else if (connection_status === CONNECTION_STATUS.INITIALIZING) {
    content = <div id="ui-placeholder">Initializing...</div>;
  } else if (connection_status === CONNECTION_STATUS.WEBSOCKETS_FAILURE) {
    content = (
      <div id="ui-placeholder">
        Sorry, but we found that your browser does not support WebSockets.
        Please consider updating your browser to a newer version or using a
        different browser and check this HIT again.
      </div>
    );
  } else if (connection_status == CONNECTION_STATUS.FAILED) {
    content = (
      <div id="ui-placeholder">
        Unable to initialize. We may be having issues with our servers. Please
        refresh the page, or if that isn't working return the HIT and try again
        later if you would like to work on this task.
      </div>
    );
  } else {
    content = <ContentLayout {...props} />;
  }
  return (
    <div className="container-fluid" id="ui-container">
      {content}
    </div>
  );
}

export {
  // Original Components
  ChatMessage,
  MessageList,
  ConnectionIndicator,
  Hourglass,
  WaitingMessage,
  ChatPane,
  IdleResponse,
  DoneButton,
  DoneResponse,
  TextResponse,
  ResponsePane,
  RightPane,
  LeftPane,
  ContentLayout,
  BaseFrontend,
};
