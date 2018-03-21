import React, { Component } from 'react';
import { Document, Page, setOptions } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';


setOptions({
  cMapUrl: 'cmaps/',
  cMapPacked: true,
});

const leftMargin = 0;
const topMargin = 111.440;

class Sample extends Component {
  state = {
    dps: false,
    numPages: null,
    pdfWidth: null,
    pdfHeight: null,
    width:  window.innerWidth,
    height:  window.innerHeight,
    scale: 1,
  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWindowDimensions);

  }

  updateWindowDimensions = () => {
    this.setState({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });
    this.setPdfScale(this.state.pdfWidth, this.state.pdfHeight);
  }

  setPdfScale = (pdfWidth, pdfHeight) => {

    const { dps, width, height } = this.state;

    this.setState({
      pdfWidth: pdfWidth, 
      pdfHeight: pdfHeight
    });

    const dpsOrSingleWith = dps ? pdfWidth * 2 : pdfWidth;
    const aspectRatio = pdfWidth / pdfHeight;
    const viewportAspectRatio = (width - leftMargin) / (height - topMargin);

    let newPageFitScale;

    if (dps) {
      if (viewportAspectRatio / 2 < aspectRatio) {
        newPageFitScale = (width - leftMargin) / dpsOrSingleWith;
      }
    }

    if (viewportAspectRatio < aspectRatio) {
      newPageFitScale = (width  - leftMargin) / dpsOrSingleWith;
    } else {
      newPageFitScale = (height - topMargin) / pdfHeight
    }

    console.log(newPageFitScale)

    this.setState({
      scale: newPageFitScale,
    });

  }


  onDocumentLoadSuccess = ({ numPages }) =>
    this.setState({
      numPages,
    })
  

  onPageLoadSuccess = (page) => {
    this.setState({
        pdfWidth: page.pageInfo.view[2],
        pdfHeight: page.pageInfo.view[3]
    });
    console.log(page.pageInfo);
    this.setPdfScale(page.pageInfo.view[2], page.pageInfo.view[3]);
  }

  render() {
    const { numPages, scale } = this.state;

    return (
      <div className="Example">
        <div style={{height: 90}}>
          <header>
            <h3>react-pdf AnnotationLayer resize test</h3>
          </header>

        </div>
        <div className="Example__container">

          <div className="Example__container__document" style={{display: 'flex', justifyContent:'center'}}>
            <Document
              file={'/CircleofFifths.pdf'}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      onLoadSuccess={this.onPageLoadSuccess}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale={scale}
                    />
                  ),
                )
              }
            </Document>
          </div>
        </div>
      </div>
    );
  }
}

export default Sample