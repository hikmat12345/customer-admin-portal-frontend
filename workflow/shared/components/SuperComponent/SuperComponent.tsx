import { Component } from 'react';

abstract class SuperComponent<P = {}, S = {}> extends Component<P, S> {
  public abstract refreshOn(value?: Record<string, any>): void;
  public abstract isValidate(): boolean;
  public abstract isModalOpen(): boolean;
  public abstract setValue(value: Record<string, any>): void;
  public abstract getValue(): Record<string, any>;
  public abstract getViewData(): Record<string, any>;
}

export default SuperComponent;
