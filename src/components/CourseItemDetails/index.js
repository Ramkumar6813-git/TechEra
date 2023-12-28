import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CourseItemDetails extends Component {
  state = {
    courseItemDetails: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount = () => {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({
      apiStatus: apiConstants.loading,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseItemDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  displayCourseDetails = () => {
    const {courseItemDetails} = this.state
    const {name, imageUrl, description} = courseItemDetails
    return (
      <div className="bg-container">
        <div className="course-full-details-div">
          <img src={imageUrl} alt={name} className="course-item-image" />
          <div className="course-details-div">
            <h1 className="course-full-name">{name}</h1>
            <p className="course-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  displayFailureView = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getCourseItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  displayLoader = () => (
    <div data-testid="loader" className="loader-div">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.displayCourseDetails()
      case apiConstants.failure:
        return this.displayFailureView()
      case apiConstants.loading:
        return this.displayLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseDetails()}
      </>
    )
  }
}

export default CourseItemDetails
