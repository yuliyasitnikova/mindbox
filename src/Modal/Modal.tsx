import React, { Component, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";

import { Close } from "../Close";

import "./style.css";

interface State {
  opened: boolean;
}

interface Props {
  opened: boolean;
  onClose: () => void;
}

export class Modal extends Component<Props, State> {
  public readonly state: State = {
    opened: false
  };

  public static getDerivedStateFromProps(props: Props, state: State): State {
    return { opened: props.opened };
  }

  public render(): ReactNode {
    return (
      <CSSTransition
        classNames={{
          enter: "modal_enter",
          enterActive: "modal_enter-active",
          enterDone: "modal_enter-done",
          exit: "modal_exit",
          exitActive: "modal_exit-active",
          exitDone: "modal_exit-done"
        }}
        in={this.state.opened}
        timeout={300}
      >
        <div className="modal">
          <div className="modal--content">
            <Close onClick={this.props.onClose} />

            {this.props.children}
          </div>
        </div>
      </CSSTransition>
    );
  }
}
