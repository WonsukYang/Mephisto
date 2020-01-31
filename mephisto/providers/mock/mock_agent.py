#!/usr/bin/env python3

# Copyright (c) Facebook, Inc. and its affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

from mephisto.data_model.agent import Agent
from mephisto.data_model.blueprint import AgentState
from mephisto.providers.mock.provider_type import PROVIDER_TYPE

from typing import List, Optional, Tuple, Dict, Any, TYPE_CHECKING

if TYPE_CHECKING:
    from mephisto.data_model.assignment import Unit
    from mephisto.data_model.database import MephistoDB
    from mephisto.data_model.worker import Worker
    from mephisto.data_model.packet import Packet


class MockAgent(Agent):
    """
    This class encompasses a worker as they are working on an individual assignment.
    It maintains details for the current task at hand such as start and end time,
    connection status, etc.
    """

    def __init__(self, db: "MephistoDB", db_id: str):
        super().__init__(db, db_id)
        self.datastore = db.get_datastore_for_provider(PROVIDER_TYPE)
        if db_id not in self.datastore['agents']:
            self.datastore["agents"][db_id] = {
                "observed": [],
                "pending_acts": [],
                "acts": [],
            }

    def observe(self, packet: "Packet") -> None:
        """Put observations into this mock agent's observation list"""
        print('apending observation!')
        self.datastore["agents"][self.db_id]["observed"].append(packet)
        super().observe(packet)

    def act(self, timeout=None) -> Optional["Packet"]:
        """
        Either take an act from this mock agent's act queue (for use
        by tests and other mock purposes) or request a regular act
        (for use in manual testing).
        """
        if len(self.datastore["agents"][self.db_id]["pending_acts"]) > 0:
            act = self.datastore["agents"][self.db_id]["pending_acts"].pop(0)
        else:
            act = super().act(timeout=timeout)

        if act is not None:
            self.datastore["agents"][self.db_id]["acts"].append(act)
        return act

    def approve_work(self) -> None:
        """Approve the work done on this specific Unit"""
        # TODO implement with the db for the core system
        raise NotImplementedError()

    def reject_work(self, reason) -> None:
        """Reject the work done on this specific Unit"""
        # TODO implement with the db for the core system
        raise NotImplementedError()

    def get_status(self) -> str:
        """Get the status of this agent in their work on their unit"""
        row = self.db.get_agent(self.db_id)
        return row["status"]

    def mark_done(self) -> None:
        """
        Take any required step with the crowd_provider to ensure that
        the worker can submit their work and be marked as complete via
        a call to get_status
        """
        if self.get_status() != AgentState.STATUS_DISCONNECT:
            self.db.update_agent(
                agent_id=self.db_id, status=AgentState.STATUS_COMPLETED
            )

    def mark_disconnected(self) -> None:
        """Mark this mock agent as having disconnected"""
        self.db.update_agent(agent_id=self.db_id, status=AgentState.STATUS_DISCONNECT)

    @staticmethod
    def new(db: "MephistoDB", worker: "Worker", unit: "Unit") -> "Agent":
        """Create an agent for this worker to be used for work on the given Unit."""
        # TODO initialize anything necessary in the mockdb if required
        return MockAgent._register_agent(db, worker, unit, PROVIDER_TYPE)
