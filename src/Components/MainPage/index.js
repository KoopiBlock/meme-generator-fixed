import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from 'reactstrap';

const photos = [
  { src: '/images/vict-baby.png' },
  { src: '/images/ned.jpeg' },
  { src: '/images/devilgirl.jpg' },
  { src: '/images/trump.jpg' },
  { src: '/images/one-does-not.jpg' },
  { src: '/images/dank.png' },
  { src: '/images/boy.png' },
  { src: '/images/sad.png' },
  { src: '/images/wolf.png' },
  { src: '/images/fry.jpg' },
  { src: '/images/jobs.jpg' },
  { src: '/images/phone.jpg' },
  { src: '/images/oldie.png' },
  { src: '/images/image.png' },
  { src: '/images/doubt.png' },
  { src: '/images/crying.png' },
  { src: '/images/sponge.png' },
  { src: '/images/dog.png' },
  { src: '/images/frust.png' },
  { src: '/images/web.png' },
  { src: '/images/penguin.png' }
];

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImagebase64: null,
      textStyle: {
        // now we call it in the handleColorChange as a setState function.
        fontFamily: "Impact",
        textColor:"black",
        fontSize: "50px",
        textTransform: "uppercase",
        fill: 'white',
        stroke: "#000",
        userSelect: "none"
      },
      ...initialState,
    };

    this.handleColorChange = this.handleColorChange.bind(this)

  }

  openImage = (index) => {
    const image = photos[index];
    const base_image = new Image();
    base_image.src = image.src;
    const base64 = this.getBase64Image(base_image);
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }));
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

 

  changeText = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      }
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }
    return stateObj;
  }

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
    this.setState({
      ...stateObj
    })
  }

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging){
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = (event) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  }

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = function() {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "meme.png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  // I changed the function:
  // and also moved the "textStyle" in to the state obeject.
  // in react if you want to change some element in the DOM you need to set a state to it and call props.
  // as much as i had fun learning class based components, its pretty old school.(rarely used).
  // so i highly advise that you also learn function based componenets, 
  // just saying function based components are much more clean.

  handleColorChange(e) {
    console.log('colorchanged!')
    this.setState({ textStyle: {
        // i know i could make it cleaner i forgot how lol
        fontFamily: "Impact",
        textColor:"black",
        fontSize: "50px",
        textTransform: "uppercase",
        fill: e.target.value,
        stroke: "#000",
        userSelect: "none"
    }})
  }

 
  render() {
    const image = photos[this.state.currentImage];
    const base_image = new Image();
    base_image.src = image.src;
    var wrh = base_image.width / base_image.height;
    var newWidth = 600;
    var newHeight = newWidth / wrh;

    let textStyle = this.state.textStyle // this is a state now.

    console.log(this.state.textStyle.fill == 'black')

 
    

    return (
      <div>
        <div className="main-content">
          <div className="sidebar">
            <NavbarBrand href="/">Make-a-Meme</NavbarBrand>
            <p>
              Maor Gadi
            </p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis dapibus dolor, in placerat sapien sagittis sit amet. Curabitur tempus cursus dolor id dignissim. Fusce porttitor, turpis sit amet volutpat porttitor, nisl sem gravida lorem, at congue ligula nunc at risus. Sed tristique ex nec ante tempor, a lacinia augue euismod. Sed porta mi eget tristique consequat. Vivamus et lorem sed metus mattis aliquet eu nec erat. Ut porta sed lacus vel fringilla. In rhoncus nisi in laoreet pulvinar. Praesent dignissim nisl sed mi blandit tincidunt.
            </p>
          </div>
          <div className="content">
            {photos.map((image, index) => (
              <div style={{margin:'5px'}} className="image-holder" key={image.src}>
                {/* <span className="meme-top-caption">Top text</span> */}
                <img
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    height: "100%",
                    margin: "10px",
                    // marginLeft: "20px"
                  }}
                  alt={index}
                  src={image.src}
                  onClick={() => this.openImage(index)}
                  role="presentation"
                />
              {/* <span className="meme-bottom-caption">Bottom text</span> */}
              </div>
            ))}
          </div>
        </div>
        <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
          <ModalBody>
            <svg
              width={newWidth}
              id="svg_ref"
              height={newHeight}
              ref={el => { this.svgRef = el }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={this.state.currentImagebase64}
                height={newHeight}
                width={newWidth}
              />
              <text
                style={{...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
              >
                  {this.state.toptext}
              </text>
              <text
                style={textStyle}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
              >
                  {this.state.bottomtext}
              </text>
            </svg>
            <div className="meme-form">

              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
              </FormGroup>

              <p>
                <input type="range" id="top-text-size-input" min="0.05" max="0.25" value="0.15" step="0.01">
                </input>
              </p>

              
                <input type="range" id="bottom-text-size-input" min="0.05" max="0.25" value="0.15" step="0.01">
                </input>
                
              <br></br>
              <select
                style={{marginBottom:'20px'}}
                name="textColor"
		            type="textColor"
                onChange={this.handleColorChange}
                value={this.state.textStyle.fill}
                >
			          <option className="black-color" value='black'>black</option>
			          <option  className="white-color" value='white' >white</option>
		          </select>

              <button onClick={() => this.convertSvgToImage()} className="btn btn-primary">Download Meme!</button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default MainPage;
