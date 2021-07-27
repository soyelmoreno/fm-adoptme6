import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  // A ref is a container for state that you want to survive past render cycles
  const elRef = useRef(null);
  if (!elRef.current) {
    // We don't want to create a new div on every render, instead we want
    // exactly one div, and the same div, all the time. "Hey, if this elRef
    // hasn't been initialized then we want to initialize it to be this div. And
    // then we want this div to survive past renders until we dispose of the
    // Modal all together and then we'll destroy it. But until then I just want
    // one, exactly one."

    // document.createElement() is not cheap, so we don't repeat it. And we need
    // to hold onto the same so that eventually we can can dispose of it.
    elRef.current = document.createElement("div");
  }

  // On the first render, append this div to the DOM
  useEffect(() => {
    modalRoot.appendChild(elRef.current);

    // Whenever we are done, remove it from the DOM to prevent memory leaks
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // createPortal: 1st argument is the contents of the modal. Wrap any children
  // elements in a simple div. 2nd argument is the container to hold the
  // contents (including the wrapper div). This is very similar to
  // ReactDOM.render where 1st argument is the app contents and the 2nd argument
  // is the container element to put the contents.
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;

// Now we can use this Modal anywhere we want to. It's a reusable Modal
// component. We can render a Modal from any part of our application and it will
// show up in the <body> element, sibling to our app root.
