import React from 'react'
import {withRouter} from 'react-router-dom'

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps: any) {
      //@ts-ignore TODO: FIX
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
  
    render() {
      return this.props.children
    }
  }
  
  //@ts-ignore TODO: FIX
  export default withRouter(ScrollToTop)