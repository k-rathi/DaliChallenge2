import React from 'react';
import Modal from 'react-modal';
import Iframe from 'react-iframe';

// Modal Container. Generates Modal with iframe of given url data of selected member.
export const ModalContainer = (props) =>
<div>
  <Modal
    className="modal"
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    style={{
      overlay: {
        backgroundColor: "rgba(0,0,0,0.4)"
      },
    }}
  >
    <div className= "flex-modal">
      <div className="flex-row">
        <div className="thumbnail-flexed">
          {props.currPerson.iconUrl
            ? <img alt="thumbnail" className="thumb" src={`http://mappy.dali.dartmouth.edu/${props.currPerson.iconUrl}`}/>
            : <div className="thumb"></div>}
        </div>
        <div className="flex-col">
          <div id="name">{props.currPerson.name}</div>
          <div id="message">{props.currPerson.message}</div>
        </div>
        <div id="projects">
          <div className="prj-header"> Projects: </div>
          { props.currPerson.project && props.currPerson.project.map( (project, i) =>
            <div key={i} className="prj"> {project} </div>
          )}
        </div>
      </div>
      <div className="iframe-container">
        <Iframe
          url={ props.iframeUrl !== ""
            ? props.iframeUrl
            : "http://www.myguysolutions.com/wp-content/uploads/2010/01/404-basic.gif"}
          width="97.5%"
          height="96%"
        />
      </div>
    </div>
  </Modal>
</div>
