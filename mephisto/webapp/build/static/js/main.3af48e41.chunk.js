(this["webpackJsonpmephisto-web"]=this["webpackJsonpmephisto-web"]||[]).push([[0],{103:function(e,t,a){e.exports=a(161)},108:function(e,t,a){},109:function(e,t,a){},161:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(13),c=a.n(l),i=(a(108),a(109),a(10)),o=a(164),u=a(17),s=function(e){var t=e.children,a=e.heading,n=e.badge;return r.a.createElement(o.b,{elevation:u.a.THREE,className:"widget"},r.a.createElement("h4",{className:"bp3-heading",style:{marginBottom:15}},void 0!==n&&r.a.createElement("span",{className:"bp3-tag bp3-large bp3-minimal bp3-round step-badge"},n),a),t)},m=a(55);var d=a(3),p=a.n(d),E=a(15),f=a(9),b=a(1),v=a(20),g=a(158);function h(){return k}var k=function(e){var t,a=e.info,n=e.onLoading,r=e.onError,l=e.onData,c=e.onEmptyData,o=e.checkIfEmptyFn,u=Object(i.a)(a,2),s=u[0],m=s.data,d=s.loading,p=s.error,E=u[1],f={refetch:void 0===E?function(){}:E,axiosInfo:a};if(d)return n(Object(v.a)({},f));if(p)return r(Object(v.a)({error:null===(t=p.response)||void 0===t?void 0:t.data},f));var b=void 0!==o?o(m):m;return g(b)&&void 0!==c?c(Object(v.a)({data:m},f)):l(Object(v.a)({data:m},f))};var y=h(),O=function(){var e,t,a=r.a.useState(0),n=Object(i.a)(a,2),l=(n[0],n[1],r.a.useState(1)),c=Object(i.a)(l,2),u=c[0],d=(c[1],r.a.useState(!1)),v=Object(i.a)(d,2),g=v[0],h=v[1],k=Object(E.b)({url:"requesters"});return r.a.createElement(s,{badge:"Step 1",heading:r.a.createElement("span",null,"Prepare it")},r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"bullet"},r.a.createElement("div",{className:"bp3-text-large bp3-running-text bp3-text-muted"},r.a.createElement(y,{info:k,onError:function(e){var t=e.refetch;return r.a.createElement("span",null,r.a.createElement(o.f,{icon:"warning-sign",color:m.a.RED3})," Something went wrong."," ",r.a.createElement("a",{onClick:function(){return t()}},r.a.createElement("strong",null,"Try again")))},onLoading:function(){return r.a.createElement("div",{className:"bp3-skeleton bp3-text"},"\xa0 ")},checkIfEmptyFn:function(e){return e.requesters},onEmptyData:function(){return r.a.createElement("span",null,r.a.createElement(o.f,{icon:"warning-sign",color:m.a.ORANGE3}),"  ","You have no accounts set up."," ",r.a.createElement("a",null,r.a.createElement("strong",null,"Configure")))},onData:function(e){var t=e.data;return r.a.createElement("span",null,r.a.createElement(o.f,{icon:"people"})," You have"," ",r.a.createElement("a",{onClick:function(){return h(!0)}},r.a.createElement("strong",null,t.requesters.length," requester accounts"))," ","set up")}})),r.a.createElement(o.d,{icon:"people",onClose:function(){return h(!1)},title:"Requester accounts",autoFocus:!0,canEscapeKeyClose:!0,enforceFocus:!0,hasBackdrop:!0,isOpen:g,position:f.a.BOTTOM,size:"72%",usePortal:!0},r.a.createElement("div",{className:b.a.DRAWER_BODY,style:{backgroundColor:m.a.LIGHT_GRAY4}},r.a.createElement("div",{className:b.a.DIALOG_BODY},k[0].data&&r.a.createElement("div",null,k[0].data.requesters.map((function(e){return r.a.createElement("div",{key:e.requester_id,style:{marginBottom:12}},r.a.createElement(o.b,{interactive:!0},r.a.createElement(o.f,{icon:e.registered?"tick-circle":"issue",color:e.registered?m.a.GREEN4:m.a.GRAY4,title:"Registered?"}),r.a.createElement("span",{style:{margin:"0 15px"},className:"bp3-tag bp3-large bp3-minimal bp3-round step-badge"},e.provider_type),r.a.createElement("h4",{style:{display:"inline",marginRight:4},className:p()("bp3-heading",{"bp3-text-muted":!e.registered})},e.requester_name)," ",!e.registered&&r.a.createElement("span",null,"\u2014 This account still needs to be registered.")))})),r.a.createElement("div",{style:{marginTop:15}},r.a.createElement(o.a,{disabled:!0,icon:"new-person"},"[TODO] Add a new requester account..."))))))),r.a.createElement("div",{className:"bullet"},r.a.createElement("div",{className:"bp3-text-large bp3-running-text bp3-text-muted"},r.a.createElement(o.f,{icon:1===u?"layer":"layers"})," You have"," ",r.a.createElement("strong",null,u," task"," ",(e="template",1===u?e:t||e+"s")),"  ","available to use"))))},N=a(18),_=a(61),j=a.n(_);function x(e){var t=e.run;return r.a.createElement("div",{className:"run-header",style:{backgroundColor:m.a.LIGHT_GRAY5,padding:10,marginBottom:"10px",borderColor:m.a.GRAY5,borderWidth:1,borderStyle:"solid",borderRadius:5}},r.a.createElement("h5",{className:"bp3-heading",style:{display:"inline"}},t.task_name)," ","\u2014 ",j.a.utc(t.start_time).fromNow(),r.a.createElement("div",{className:"params-list",style:{display:"block",marginTop:10}},Object.entries(t.params).map((function(e){var t=Object(i.a)(e,2),a=t[0],n=t[1];return r.a.createElement("span",{key:a,style:{display:"inline-block",marginRight:5,fontSize:12}},r.a.createElement("span",{className:"param-name"},a),"=",r.a.createElement("strong",{className:"param-value"},n))}))),r.a.createElement("div",{className:"details"},r.a.createElement("div",{className:"metrics highlight-first"},r.a.createElement("div",{className:"metric"},t.task_status.created+t.task_status.launched,r.a.createElement("label",null,"Remaining")),r.a.createElement("div",{className:"metric"},t.task_status.completed+t.task_status.accepted+t.task_status.mixed+t.task_status.rejected,r.a.createElement("label",null,"Completed")),r.a.createElement("div",{className:"metric"},t.task_status.launched+t.task_status.assigned,r.a.createElement("label",null,"In-Flight")))))}var R=a(165),C=a(24);var L=function(e){var t=e.prefix,a=e.onUpdate,n=e.field,l=t+"|"+n.dest+"|"+n.option_string,c=function(e){a(Object(C.a)({},l,e))};return r.a.useEffect((function(){"bool"===n.type?c(!!n.default):n.default&&c(n.default)}),[n.default]),"bool"===n.type?r.a.createElement("div",{key:n.dest},r.a.createElement(o.c,{defaultChecked:!!n.default,label:n.dest,onChange:function(e){c(e.target.checked)}}),r.a.createElement("p",{className:"bp3-text-muted"},n.help)):r.a.createElement(o.e,{label:n.dest,labelInfo:n.help,labelFor:l},r.a.createElement(o.g,{id:l,placeholder:n.default,defaultValue:n.default,onChange:function(e){return c(e.target.value)}}))};var w=function(e){var t=e.prefix,a=e.onUpdate,n=e.options;return r.a.useEffect((function(){a("CLEAR_"+t),Object.values(n).flatMap((function(e){return Object.values(e.args)})).forEach((function(e){var n=t+"|"+e.dest+"|"+e.option_string;a(Object(C.a)({},n,e.default))}))}),[n]),r.a.createElement("div",null,r.a.createElement("div",{style:{margin:"20px 0"}},r.a.createElement(o.b,{className:"bp3-elevation-2"},Object.values(n).flatMap((function(e){return Object.values(e.args)})).map((function(e){return r.a.createElement(L,{key:t+e.dest,prefix:t,onUpdate:a,field:e})})))))},S=R.a.ofType(),q=h(),A=function(e,t){var a=t.handleClick,n=t.modifiers,l=t.query;if(!n.matchesPredicate)return null;var c="".concat(e.rank,". ").concat(e.name);return r.a.createElement(o.i,{active:n.active,disabled:n.disabled,key:e.rank,onClick:a,text:T(c,l)})};function D(e){var t=e.data,a=e.onUpdate,n=r.a.useState(null),l=Object(i.a)(n,2),c=l[0],u=l[1],s=Object(E.b)({url:"blueprint/".concat((null===c||void 0===c?void 0:c.name)||"none","/options")});return r.a.createElement("div",null,r.a.createElement(S,{items:t,itemRenderer:A,onItemSelect:function(e){a({blueprint:e.name}),u(e)},activeItem:c},r.a.createElement(o.a,{icon:"map",rightIcon:"caret-down"},c?c.name:"Pick a blueprint...")),c&&r.a.createElement(q,{info:s,onLoading:function(){return r.a.createElement("span",null,"Loading...")},onError:function(){return r.a.createElement("span",null,"Error")},onData:function(e){var t=e.data;return r.a.createElement(w,{onUpdate:a,options:t.options,prefix:"bp"})}}))}function I(e){return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function T(e,t){var a=0,n=t.split(/\s+/).filter((function(e){return e.length>0})).map(I);if(0===n.length)return[e];for(var l=new RegExp(n.join("|"),"gi"),c=[];;){var i=l.exec(e);if(!i)break;var o=i[0].length,u=e.slice(a,l.lastIndex-o);u.length>0&&c.push(u),a=l.lastIndex,c.push(r.a.createElement("strong",{key:a},i[0]))}var s=e.slice(a);return s.length>0&&c.push(s),c}var Y=h();function G(e){var t=e.data,a=e.onUpdate,n=r.a.useState(null),l=Object(i.a)(n,2),c=l[0],u=l[1],s=Object(E.b)({url:"architect/".concat(c||"none","/options")});return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(o.b,{key:e,interactive:e!==c,style:{marginBottom:10,backgroundColor:void 0},onClick:function(){u(e),a({architect:e})}},r.a.createElement(o.f,{icon:e===c?"tick-circle":"circle",color:e===c?m.a.GREEN4:m.a.GRAY4,title:"Selected",style:{marginRight:10}}),e)})),c&&r.a.createElement(Y,{info:s,onLoading:function(){return r.a.createElement("span",null,"Loading...")},onError:function(){return r.a.createElement("span",null,"Error")},onData:function(e){var t=e.data;return r.a.createElement(w,{onUpdate:a,options:t.options,prefix:"arch"})}}))}var B=R.a.ofType(),U=(h(),function(e,t){var a=t.handleClick,n=t.modifiers,l=t.query;if(!n.matchesPredicate)return null;var c="".concat(e.requester_id,". ").concat(e.requester_name);return r.a.createElement(o.i,{active:n.active,disabled:n.disabled,key:e.requester_id,onClick:a,text:z(c,l)})});function F(e){var t=e.data,a=e.onUpdate,n=r.a.useState(null),l=Object(i.a)(n,2),c=l[0],u=l[1];return r.a.createElement("div",null,r.a.createElement(B,{items:t,itemRenderer:U,onItemSelect:function(e){a({requester:e.requester_name}),u(e)},activeItem:c},r.a.createElement(o.a,{icon:"map",rightIcon:"caret-down"},c?c.requester_name:"Pick a requester...")))}function P(e){return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function z(e,t){var a=0,n=t.split(/\s+/).filter((function(e){return e.length>0})).map(P);if(0===n.length)return[e];for(var l=new RegExp(n.join("|"),"gi"),c=[];;){var i=l.exec(e);if(!i)break;var o=i[0].length,u=e.slice(a,l.lastIndex-o);u.length>0&&c.push(u),a=l.lastIndex,c.push(r.a.createElement("strong",{key:a},i[0]))}var s=e.slice(a);return s.length>0&&c.push(s),c}var W=o.k.create({position:f.a.BOTTOM_LEFT}),H=a(25),M=a.n(H).a.create({baseURL:"http://localhost:5000/api/v1/"});M.interceptors.request.use((function(e){return e.delayed?new Promise((function(t){return setTimeout((function(){return t(e)}),!0===e.delayed?600:!1===e.delayed?0:e.delayed)})):e})),Object(E.a)({axios:M});var $=M,J=null;function K(e){var t=function(e){var t=Object.entries(e).map((function(e){var t=Object(i.a)(e,2),a=t[0],n=t[1];if("blueprint"===a)return["blueprint_type",{option_string:"--blueprint-type",value:n}];if("architect"===a)return["architect_type",{option_string:"--architect-type",value:n}];if("requester"===a)return["requester_name",{option_string:"--requester-name",value:n}];var r=a.split("|"),l=Object(i.a)(r,3),c=l[0],o=l[1],u=l[2];return"bp"===c&&null===n?[J,J]:[o,{option_string:u,value:null===n?null:n.toString()}]})).filter((function(e){var t=Object(i.a)(e,2),a=t[0];t[1];return a!==J}));return console.table(Object.fromEntries(t)),Object.fromEntries(t)}(e);return $.post("task_runs/launch",t)}var V=h(),Q=h(),X=h(),Z=h(),ee=function(){var e=Object(E.b)({url:"task_runs/running"});return r.a.createElement(s,{badge:"Step 2",heading:r.a.createElement("span",null,"Launch it")},r.a.createElement(V,{info:e,onLoading:function(){return r.a.createElement("div",{className:"bp3-non-ideal-state bp3-skeleton"},r.a.createElement("div",{className:"bp3-non-ideal-state-visual",style:{fontSize:20}},r.a.createElement("span",{className:"bp3-icon bp3-icon-clean"})),r.a.createElement("div",null,"You have no tasks running."))},onData:function(e){var t=e.data;return r.a.createElement("div",null,t.task_runs.map((function(e){return r.a.createElement(x,{key:e.task_run_id,run:e})})))},checkIfEmptyFn:function(e){return e.task_runs},onEmptyData:function(){return r.a.createElement("div",{className:"bp3-non-ideal-state"},r.a.createElement("div",{className:"bp3-non-ideal-state-visual",style:{fontSize:20}},r.a.createElement("span",{className:"bp3-icon bp3-icon-clean"})),r.a.createElement("div",null,"You have no tasks running."))},onError:function(e){var t=e.refetch;return r.a.createElement("span",null,r.a.createElement(o.f,{icon:"warning-sign",color:m.a.RED3})," Something went wrong."," ",r.a.createElement("a",{onClick:function(){return t()}},r.a.createElement("strong",null,"Try again")))}}),r.a.createElement("div",null,r.a.createElement("div",{style:{textAlign:"center",marginTop:15}},r.a.createElement(te,null))))};function te(){var e=r.a.useState(!1),t=Object(i.a)(e,2),a=t[0],n=t[1],l=Object(E.b)({url:"launch/options"}),c=Object(E.b)({url:"requesters"}),u=Object(E.b)({url:"task_runs/options"}),s=r.a.useReducer((function(e,t){return"CLEAR_ALL"===t?{}:"CLEAR_bp"===t?Object.keys(e).filter((function(e){return!e.startsWith("bp|")})).reduce((function(t,a){return t[a]=e[a],t}),{}):"CLEAR_arch"===t?Object.keys(e).filter((function(e){return!e.startsWith("arch|")})).reduce((function(t,a){return t[a]=e[a],t}),{}):"CLEAR_task"===t?Object.keys(e).filter((function(e){return!e.startsWith("task|")})).reduce((function(t,a){return t[a]=e[a],t}),{}):Object(v.a)({},e,{},t)}),{}),d=Object(i.a)(s,2),p=d[0],g=d[1];return r.a.createElement("div",null,r.a.createElement("button",{className:"bp3-button",onClick:function(){return n(!0)}},"Launch a task"),r.a.createElement(o.d,{icon:"people",onClose:function(){return n(!1)},title:"Launch a task",autoFocus:!0,canEscapeKeyClose:!1,canOutsideClickClose:!1,enforceFocus:!0,hasBackdrop:!0,isOpen:a,position:f.a.RIGHT,size:"50%",usePortal:!0},r.a.createElement("div",{className:b.a.DRAWER_BODY,style:{backgroundColor:m.a.LIGHT_GRAY4}},r.a.createElement("div",{className:b.a.DIALOG_BODY},r.a.createElement("h2",null,"Step 1. Choose a Task Blueprint"),r.a.createElement("p",{className:"bp3-text-muted"},"A blueprint defines the task that will be run & its associated configuration parameters."),r.a.createElement(Q,{info:l,onLoading:function(){return r.a.createElement("span",null,"Loading...")},onData:function(e){var t=e.data;return r.a.createElement("div",null,r.a.createElement(D,{data:t.blueprint_types,onUpdate:function(e){return g(e)}}))},onError:function(){return r.a.createElement("span",null,"Error")}}),r.a.createElement("h2",null,"Step 2. Choose an Architect"),r.a.createElement("p",{className:"bp3-text-muted"},"An architect manages the deployment target of your task."),r.a.createElement(Q,{info:l,onLoading:function(){return r.a.createElement("span",null,"Loading...")},onData:function(e){var t=e.data;return r.a.createElement("div",null,r.a.createElement(G,{data:t.architect_types,onUpdate:function(e){g(e)}}))},onError:function(){return r.a.createElement("span",null,"Error")}}),r.a.createElement("h2",null,"Step 3. Choose a Requester"),r.a.createElement("p",{className:"bp3-text-muted"},"A requester is the service account that will run your task."),r.a.createElement(X,{info:c,onLoading:function(){return r.a.createElement("span",null,"Loading...")},onData:function(e){var t=e.data;return r.a.createElement("div",null,r.a.createElement(F,{data:t.requesters.filter((function(e){return e.registered})),onUpdate:function(e){g(e)}}))},onError:function(){return r.a.createElement("span",null,"Error")}}),r.a.createElement("h2",null,"Step 4. Final Task Options"),r.a.createElement(Z,{info:u,onLoading:function(){return r.a.createElement("span",null,"Loading...")},onData:function(e){var t=e.data;return r.a.createElement("div",null,r.a.createElement(w,{prefix:"task",options:t.options,onUpdate:function(e){return g(e)}}))},onError:function(){return r.a.createElement("span",null,"Error")}}),r.a.createElement(o.a,{onClick:function(){var e=void 0!==p.blueprint&&void 0!==p.architect&&void 0!==p.requester,t=Object.entries(p).reduce((function(e,t){var a=Object(i.a)(t,2),n=a[0],r=a[1];return n.startsWith("task|")?e&&null!==r:e}),!0);(e=e&&t)?(g("CLEAR_ALL"),K(p).then((function(){n(!1),W.dismiss("loading-msg"),W.show({message:"Launched!",icon:"cloud-upload",intent:N.a.SUCCESS,timeout:3e3})})).catch((function(){})),W.show({message:"Launching task... Please wait this may take a while.",icon:"cloud-upload",intent:N.a.NONE,timeout:4e4},"loading-msg")):W.show({message:"Error: Must select Blueprint + Architect + Requester and fill all task params",icon:"cloud-upload",intent:N.a.DANGER,timeout:2e3})},large:!0,icon:"cloud-upload",intent:N.a.SUCCESS,style:{margin:"20px auto 0"}},"Launch")))))}var ae=h(),ne=function(){var e=Object(E.b)({url:"task_runs/reviewable"});return r.a.createElement(s,{badge:"Step 3",heading:r.a.createElement("span",null,"Review it")},r.a.createElement(ae,{info:e,onLoading:function(){return r.a.createElement("div",{className:"bp3-skeleton"},r.a.createElement("div",{className:"bp3-non-ideal-state"},r.a.createElement("div",{className:"bp3-non-ideal-state-visual",style:{fontSize:20}},r.a.createElement("span",{className:"bp3-icon bp3-icon-inbox-search"})),r.a.createElement("div",null,"You have no work to review.")))},onError:function(e){var t=e.refetch;return r.a.createElement("span",null,r.a.createElement(o.f,{icon:"warning-sign",color:m.a.RED3})," Something went wrong."," ",r.a.createElement("a",{onClick:function(){return t()}},r.a.createElement("strong",null,"Try again")))},onData:function(e){var t=e.data;return r.a.createElement("span",null,t.task_runs.map((function(e){return r.a.createElement(x,{key:e.task_run_id,run:e})})))},checkIfEmptyFn:function(e){return e.task_runs},onEmptyData:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"bp3-non-ideal-state"},r.a.createElement("div",{className:"bp3-non-ideal-state-visual",style:{fontSize:20}},r.a.createElement("span",{className:"bp3-icon bp3-icon-inbox-search"})),r.a.createElement("div",null,"You have no work to review.")))}}))},re=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"above-the-fold"}),r.a.createElement("header",null,r.a.createElement("h1",{className:"bp3-heading"},"mephisto"),r.a.createElement("em",{className:"bp3-italics bp3-text-large bp3-text-disabled",style:{position:"relative",top:-8}},"crowdsourcing without the tears")),r.a.createElement("div",{className:"container"},r.a.createElement(O,null),r.a.createElement(ee,null),r.a.createElement(ne,null)))};a(159),a(160);c.a.render(r.a.createElement(re,null),document.getElementById("root"))}},[[103,1,2]]]);
//# sourceMappingURL=main.3af48e41.chunk.js.map