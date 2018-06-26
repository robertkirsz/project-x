import { injectGlobal } from 'styled-components'

const layerStyles = `
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`

injectGlobal`
  .fade {
    &-appear,
    &-enter {
      opacity: 0;
      transform: scale(1.05);
      &-active {
        opacity: 1;
        transform: scale(1);
        transition: 0.5s;
      }
    }
    &-exit {
      opacity: 1;
      transform: scale(1);
      &-active {
        opacity: 0;
        transform: scale(0.95);
        transition: 0.5s;
      }
    }
  }

  .fade-right {
    &-enter {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
      &-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: 0.5s;
      }
    }
    &-exit {
      ${layerStyles}
      transform: translate3d(0, 0, 0);
      opacity: 1;
      &-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
        transition: 0.5s;
      }
    }
  }

  .fade-left {
    &-enter {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
      &-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: 0.5s;
      }
    }
    &-exit {
      ${layerStyles}
      opacity: 1;
      transform: translate3d(0, 0, 0);
      &-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
        transition: 0.5s;
      }
    }
  }

  .fade-bottom {
    &-enter {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
      &-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: 0.5s;
      }
    }
    &-exit {
      ${layerStyles}
      transform: translate3d(0, 0, 0);
      opacity: 1;
      &-active {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
        transition: 0.5s;
      }
    }
  }
`
