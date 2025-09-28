// Complete type override for Preact/React compatibility
declare module 'react' {
  type ReactNode = any
  type ReactElement = any
  interface ReactPortal {
    children?: any
    key?: any
    type?: any
    props?: any
  }
}

declare global {
  namespace React {
    type ReactNode = any
    type ReactElement = any
    type ComponentType<P = {}> = any
    type JSXElementConstructor<P> = any
    interface Component<P = {}, S = {}, SS = any> {
      render(): any
    }
  }
}

// Override preact types to be compatible
declare module 'preact' {
  interface VNode<P = {}> {
    children?: any
    key?: any
    type?: any
    props?: any
  }
  
  namespace preact {
    type ComponentChildren = any
  }
}

export {}
