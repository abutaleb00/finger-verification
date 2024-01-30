// ** React Imports
import { Fragment, useEffect, memo } from "react";

// ** Third Party Components
import classnames from "classnames";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";
import {
  handleContentWidth,
  handleMenuCollapsed,
  handleMenuHidden,
} from "@store/layout";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
// ** ThemeConfig
import themeConfig from "@configs/themeConfig";
import { useIdleSession } from "../../../../views/components/useIdleSession";

// ** Styles
import "animate.css/animate.css";
import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'
export const SessionWarning = globalThis.SessionWarning;
export const SessionTimeOut = globalThis.SessionTimeOut;
const config = useJwt.jwtConfig
const LayoutWrapper = (props) => {
  // ** Props
  const { children, routeMeta } = props;

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const handleLogout = () => {
    localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)   
    axios.delete('/oauth/revoke').then(res => {
      if(res.data.result.error === false){
        localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
        navigate('/login')
        
      } else if(res.data.result.error === true){
        setBlock(false)
        toast.error(res.data.result.errorMsg)
        localStorage.removeItem('userData')
        localStorage.removeItem(config.storageTokenKeyName)
        localStorage.removeItem(config.storageRefreshTokenKeyName)
        navigate('/login')
      }
     })
     .catch(err => {
      localStorage.removeItem('userData')
        // toast.error(err.data.result.errorMsg)
     })

  }
  // const handleLogout = () => {
  //   console.log("logout");
  // };
  const navbarStore = store.navbar;
  const layoutStored = store.layout.layout;
  const contentWidth = store.layout.contentWidth;
  //** Vars
  const appLayoutCondition =
    (layoutStored.layout === "horizontal" && !routeMeta) ||
    (layoutStored.layout === "horizontal" && routeMeta && !routeMeta.appLayout);
  const Tag = appLayoutCondition ? "div" : Fragment;

  const IDLE_CONFIG = {
    threshold: SessionWarning, // idle time threshold in milliseconds
    timeout: SessionTimeOut, // timeout duration in milliseconds
    action: handleLogout, // action to be taken when timeout is reached
  };

  const { open, idleTime, handleUserActivity } = useIdleSession(IDLE_CONFIG);


  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (
        routeMeta.contentWidth &&
        routeMeta.contentWidth === store.layout.contentWidth
      ) {
        dispatch(handleContentWidth(themeConfig.layout.contentWidth));
      }
      if (
        routeMeta.menuCollapsed &&
        routeMeta.menuCollapsed === store.layout.menuCollapsed
      ) {
        dispatch(handleMenuCollapsed(!store.layout.menuCollapsed));
      }
      if (
        routeMeta.menuHidden &&
        routeMeta.menuHidden === store.layout.menuHidden
      ) {
        dispatch(handleMenuHidden(!store.layout.menuHidden));
      }
    }
  };

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth));
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden));
      }
    }
    return () => cleanUp();
  }, [routeMeta]);

  return (
    <div
      className={classnames("app-content content overflow-hidden", {
        [routeMeta ? routeMeta.className : ""]:
          routeMeta && routeMeta.className,
        "show-overlay": navbarStore.query.length,
      })}
    >
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          "content-wrapper": routeMeta && !routeMeta.appLayout,
          "content-area-wrapper": routeMeta && routeMeta.appLayout,
          "container-xxl p-0": contentWidth === "boxed",
        })}
      >
        <Tag {...(appLayoutCondition ? { className: "content-body" } : {})}>
          <Modal
            isOpen={open}
            // toggle={() => setDisabledAnimation(!disabledAnimation)}
            className="modal-dialog-centered"
            fade={false}
          >
            <ModalHeader
              // toggle={() => setDisabledAnimation(!disabledAnimation)}
            >
              Your Session
            </ModalHeader>
            <ModalBody>
              <Alert className="mt-1" color="danger">
                <div className="alert-body" style={{textAlign:"center"}}>
                You&#39;ve been idle for {parseFloat(idleTime/1000/60)?.toFixed(2)} Minutes
                </div>
              </Alert>
                <p> You've been inactive for a while. To keep your session active, please click the button below</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={handleLogout}
              >
                 LogOut
              </Button>{" "}
              <Button
                color="primary"
                onClick={handleUserActivity}
              >
                 Keep Session Active
              </Button>{" "}
            </ModalFooter>
          </Modal>
          {children}
        </Tag>
      </div>
    </div>
  );
};

export default memo(LayoutWrapper);
