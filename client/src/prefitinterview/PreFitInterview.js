import React, { Component } from 'react'
import {
  Panel,
  OverlayTrigger,
  Image,
  Popover,
  Radio,
  Checkbox,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Well
} from 'react-bootstrap'
import './PreFit.css'
import { create } from './api-prefitinterview.js'
import { listByOwnerPublic } from './../shop/api-shop'
import { Redirect } from 'react-router-dom'
import DuplicateCyclistWarningModal from '../cyclist/DuplicateCyclistWarningModal'
import {
  validateInputLength,
  validateBirthDate,
  validateEmail,
  validateZipCode,
  validatePhone,
  validateHeight,
  validateWeight
} from '../lib/form-validation'
import fksLogo from './../assets/fksicon.jpg'

class PreFitInterview extends Component {
  constructor({ match }) {
    super()
    this.state = {
      createdForUser: '',
      createdForShop: null,
      shop: {},
      logoUrl: 'none',
      loading: true,
      referralSource: 'Returning Client',
      referralSourceDetails: '',
      error: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
      birthDate: '',
      gender: 'Male',
      flexibility: 'Good',
      ridingStyle: 'Competitive',
      height: '',
      weight: '',
      heightUnits: 'in.',
      weightUnits: 'lbs.',
      yearsCycling: 0,
      hoursPerWeek: 0,
      skillsCrashing: false,
      skillsCornering: false,
      skillsDescending: false,
      skillsClimbing: false,
      skillsFlats: false,
      skillsWeightDistribution: false,
      cyclingGoals: '',
      priorBikeFit: false,
      objectiveMeasureAndAdvise: false,
      objectiveSetUp: false,
      objectiveGeneral: false,
      objectiveRelieve: false,
      objectiveImprove: false,
      objectiveReplicate: false,
      objectiveShoe: false,
      objectiveSaddle: false,
      objectiveAero: false,
      objectiveComments: '',
      physicalComments: '',
      discomfortFeet: false,
      discomfortKnees: false,
      discomfortHips: false,
      discomfortButt: false,
      discomfortPerineumGenitalia: false,
      discomfortLowerBack: false,
      discomfortShouldersNeck: false,
      discomfortHandsWristsElbows: false,
      discomfortOther: false,
      discomfortOtherText: '',
      otherPhysicalActivities: '',
      bikeComments: '',
      bikeType: 'Road Bike',
      bikeMake: '',
      bikeModel: '',
      bikeFrameSize: '',
      bikeNewStyle: false,
      bikeReasons: '',
      bikeChannelNew: false,
      bikeChannelUsed: false,
      bikeChannelInStore: false,
      bikeChannelOnline: false,
      bikeChannelCustomFrameBuilder: false,
      bikeChannelFullyBuilt: false,
      bikeChannelFrameOnly: false,
      bikeBudget: '',
      bikeBrandsModels: '',
      bikeFactorBrandModel: false,
      bikeFactorComponents: false,
      bikeFactorValue: false,
      bikeFactorAvailability: false,
      bikeFactorReviews: false,
      bikeFactorReputation: false,
      bikeFactorCost: false,
      bikeFactorFit: false,
      bikeFactorAppearance: false,
      bikeFactorOther: false,
      bikeFactorOtherText: '',
      mediaConsent: 'No',
      redirectToConfirmationPage: false
    }
    this.match = match
  }

  componentDidMount = () => {
    listByOwnerPublic({
      userId: this.match.params.userId
    }).then((data) => {
      if (data.error) {
        if (data.error !== 'User not found')
          this.setState({
            error: data.error,
            loading: false,
            createdForUser: this.match.params.userId
          })
        else this.setState({ error: data.error, loading: false })
        //      if(data.error==="Shop Not Found") this.setState({createdForShop:'none'})
      } else {
        if (data !== null) {
          const logoUrl = `/api/shops/logo/${data._id}?${new Date().getTime()}`
          this.setState({
            shop: data,
            logoUrl,
            loading: false,
            createdForUser: this.match.params.userId,
            createdForShop: data._id
          })
        }
      }
    })
  }

  convertedHeight = () => {
    if (this.state.height === '') return 0
    else if (this.state.heightUnits === 'cm.' || this.state.height > 77)
      return this.state.height
    else return (this.state.height * 2.54).toFixed(1)
  }

  convertedWeight = () => {
    if (this.state.weight === '') return 0
    else if (this.state.weightUnits === 'kgs.' || this.state.weight < 80)
      return this.state.weight
    else return (this.state.weight / 2.205).toFixed(1)
  }

  clickSubmitPreFitInterview = () => {
    let factors = ''
    if (this.state.bikeFactorBrandModel) factors = factors + 'Brand/Model - '
    if (this.state.bikeFactorComponents) factors = factors + 'Components - '
    if (this.state.bikeFactorValue) factors = factors + 'Value - '
    if (this.state.bikeFactorAvailability) factors = factors + 'Availability - '
    if (this.state.bikeFactorReviews) factors = factors + 'Reviews - '
    if (this.state.bikeFactorReputation) factors = factors + 'Repuation - '
    if (this.state.bikeFactorCost) factors = factors + 'Cost - '
    if (this.state.bikeFactorFit) factors = factors + 'Fit - '
    if (this.state.bikeFactorAppearance) factors = factors + 'Appearance - '
    if (this.state.bikeFactorOther)
      factors = factors + 'Other: ' + this.state.bikeFactorOtherText + ' - '
    if (factors.length > 3) factors = factors.substring(0, factors.length - 3)

    let channels = ''
    if (this.state.bikeChannelNew) channels = channels + 'New - '
    if (this.state.bikeChannelUsed) channels = channels + 'Used - '
    if (this.state.bikeChannelInStore) channels = channels + 'In Store - '
    if (this.state.bikeChannelOnline) channels = channels + 'Online - '
    if (this.state.bikeChannelCustomFrameBuilder)
      channels = channels + 'Custom Frame Builder - '
    if (this.state.bikeChannelFullyBuilt) channels = channels + 'Fully Built - '
    if (this.state.bikeChannelFrameOnly) channels = channels + 'Frame Only - '
    if (channels.length > 3)
      channels = channels.substring(0, channels.length - 3)

    let discomfortAreas = ''
    if (this.state.discomfortFeet) discomfortAreas = discomfortAreas + 'Feet - '
    if (this.state.discomfortdKnees)
      discomfortAreas = discomfortAreas + 'Knees - '
    if (this.state.discomforttHips)
      discomfortAreas = discomfortAreas + 'Hips - '
    if (this.state.discomfortButt) discomfortAreas = discomfortAreas + 'Butt - '
    if (this.state.discomfortPerineumGenitalia)
      discomfortAreas = discomfortAreas + 'Perineum or Genitalia - '
    if (this.state.discomfortLowerBack)
      discomfortAreas = discomfortAreas + 'Lower Back - '
    if (this.state.discomfortShouldersNeck)
      discomfortAreas = discomfortAreas + 'Shoulders or Neck - '
    if (this.state.discomfortHandsWristsElbows)
      discomfortAreas = discomfortAreas + 'Hands, Wrists or Elbows - '
    if (this.state.discomfortOther)
      discomfortAreas =
        discomfortAreas + 'Other: ' + this.state.discomfortOtherText + ' - '
    if (discomfortAreas.length > 3)
      discomfortAreas = discomfortAreas.substring(0, discomfortAreas.length - 3)

    let skillsAndConfidence = ''
    if (this.state.skillsCrashing)
      skillsAndConfidence = skillsAndConfidence + 'Crashing - '
    if (this.state.skillsCornering)
      skillsAndConfidence = skillsAndConfidence + 'Cornering - '
    if (this.state.skillsDescending)
      skillsAndConfidence = skillsAndConfidence + 'Descending - '
    if (this.state.skillsClimbing)
      skillsAndConfidence = skillsAndConfidence + 'Climbing - '
    if (this.state.skillsFlats)
      skillsAndConfidence = skillsAndConfidence + 'Flats - '
    if (this.state.skillsWeightDistribution)
      skillsAndConfidence = skillsAndConfidence + 'Weight Distribution - '
    if (skillsAndConfidence.length > 3)
      skillsAndConfidence = skillsAndConfidence.substring(
        0,
        skillsAndConfidence.length - 3
      )

    const prefitinterview = {
      createdForShop: this.state.createdForShop,
      createdForUser: this.state.createdForUser,
      createdForCyclist: null,
      referralSource: this.state.referralSource,
      referralSourceDetails: this.state.referralSourceDetails,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      zipCode: this.state.zipCode,
      birthDate: this.state.birthDate,
      gender: this.state.gender,
      ridingStyle: this.state.ridingStyle,
      height: this.convertedHeight(),
      weight: this.convertedWeight(),
      yearsCycling: this.state.yearsCycling,
      hoursPerWeek: this.state.hoursPerWeek,
      skillsAndConfidence: skillsAndConfidence,
      cyclingGoals: this.state.cyclingGoals,
      priorBikeFit: this.state.priorBikeFit,
      objectiveMeasureAndAdvise: this.state.objectiveMeasureAndAdvise,
      objectiveSetUp: this.state.objectiveSetUp,
      objectiveGeneral: this.state.objectiveGeneral,
      objectiveRelieve: this.state.objectiveRelieve,
      objectiveImprove: this.state.objectiveImprove,
      objectiveReplicate: this.state.objectiveReplicate,
      objectiveShoe: this.state.objectiveShoe,
      objectiveSaddle: this.state.objectiveSaddle,
      objectiveAero: this.state.objectiveAero,
      objectiveComments: this.state.objectiveComments,
      physicalComments: this.state.physicalComments,
      discomfortAreas: discomfortAreas,
      otherPhysicalActivities: this.state.otherPhysicalActivities,
      bikeComments: this.state.bikeComments,
      bikeType: this.state.bikeType,
      bikeMake: this.state.bikeMake,
      bikeModel: this.state.bikeModel,
      bikeFrameSize: this.state.bikeFrameSize,
      bikeCrankLength: this.state.bikeCrankLength,
      pedalType: this.state.peadalType,
      pedalBrand: this.state.pedalBrand,
      bikeNewStyle: this.state.bikeNewStyle,
      bikeReasons: this.state.bikeReasons,
      bikeChannels: channels,
      bikeBudget: this.state.bikeBudget,
      bikeBrandsModels: this.state.bikeBrandsModels,
      bikeDecisionFactors: factors,
      mediaConsent: this.state.mediaConsent
    }

    create({ userId: this.match.params.userId }, prefitinterview).then(
      (data) => {
        if (data.error) {
          this.setState({ error: data.error })
          console.log(data.error)
        } else {
          this.setState({ error: '', redirectToConfirmationPage: true })
        }
      }
    )
  }

  handleCheckChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked })
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
  }

  validateForm() {
    return (
      validateInputLength(this.state.firstName, 1) === 'success' &&
      (validateEmail(this.state.email) === 'success') |
        (validateEmail(this.state.email) === null) &&
      validateInputLength(this.state.lastName, 1) === 'success' &&
      (validatePhone(this.state.phone) === 'success') |
        (validatePhone(this.state.phone) === null) &&
      validateBirthDate(this.state.birthDate) === 'success'
    )
  }

  render() {
    if (this.state.loading) return null
    let popTitle = ''
    if (this.validateForm())
      popTitle = 'Please Click Submit to Complete Interview'
    else popTitle = 'Please complete these requried fields:'
    const popoverSubmit = (
      <Popover id="popover-submit" title={popTitle}>
        {validateInputLength(this.state.firstName, 1) !== 'success' && (
          <p>First Name</p>
        )}
        {validateInputLength(this.state.lastName, 1) !== 'success' && (
          <p>Last Name</p>
        )}
        {validateEmail(this.state.email) !== 'success' && <p>Email</p>}
        {validatePhone(this.state.phone) !== 'success' && <p>Phone</p>}
        {validateBirthDate(this.state.birthDate) !== 'success' && (
          <p>Birth Date</p>
        )}
      </Popover>
    )

    if (this.state.redirectToConfirmationPage)
      return (
        <Redirect
          to={{
            pathname: '/pre-fit-interview/confirmation',
            state: { prefitState: this.state }
          }}
        />
      )
    let logo = fksLogo
    if (this.state.logoUrl !== 'none') logo = this.state.logoUrl
    if (this.state.error === 'User Not Found')
      return (
        <div className="globalCore-pre-fit-interview">
          <Well className="globalCore-pre-fit-interview-header">
            <Image className="pre-fit-logo" src={logo} />
            {this.state.logoUrl !== 'none' &&
              this.state.shop.name +
                ' | ' +
                this.state.shop.address +
                ' | ' +
                this.state.shop.phone}
            {this.state.logoUrl === 'none' && (
              <b>Fit Kit Studio (Pre Bike Fit Interview Form)</b>
            )}
          </Well>
          <Well>
            This pre-fit interview link is not valid. Please contact your bike
            fitting professional.
          </Well>
        </div>
      )
    else
      return (
        <div className="globalCore-pre-fit-interview">
          <Well className="globalCore-pre-fit-interview-header">
            <Image className="pre-fit-logo" src={logo} />
            {this.state.logoUrl !== 'none' &&
              this.state.shop.name +
                ' | ' +
                this.state.shop.address +
                ' | ' +
                this.state.shop.phone}
            {this.state.logoUrl === 'none' && (
              <b>Fit Kit Studio (Pre Bike Fit Interview Form)</b>
            )}
          </Well>

          <Panel className="modal-container">
            <Panel.Heading>
              <Panel.Title>Pre-Fit Interview</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              {this.state.showDuplicateWarning && (
                <div>
                  <DuplicateCyclistWarningModal
                    container={this}
                    userId={this.match.params.userId}
                    duplicateCustomers={this.state.duplicateCustomers}
                    handleRequestClose={this.handleRequestClose}
                    handleContinue={this.handleContinue}
                    reloadCyclists={this.reloadCyclists}
                  />
                  <div className="centerthis">
                    <Button
                      bsStyle="link"
                      bsSize="xsmall"
                      onClick={this.clickButton}
                    >
                      <span
                        className="glyphicon glyphicon-trash"
                        aria-label="Delete"
                        aria-hidden="true"
                      >
                        {' '}
                      </span>
                    </Button>
                  </div>
                </div>
              )}

              <Panel>
                <Panel.Heading>
                  <Panel.Title>Contact Details:</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <FormGroup
                    validationState={validateInputLength(
                      this.state.firstName,
                      1
                    )}
                  >
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                      className="pre-fit-input"
                      value={this.state.firstName}
                      onChange={this.handleChange('firstName')}
                      name="firstName"
                      autoFocus
                    />
                  </FormGroup>
                  <FormGroup
                    validationState={validateInputLength(
                      this.state.lastName,
                      1
                    )}
                  >
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                      className="pre-fit-input"
                      value={this.state.lastName}
                      onChange={this.handleChange('lastName')}
                      name="lastName"
                    />
                  </FormGroup>
                  <FormGroup validationState={validateEmail(this.state.email)}>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      className="pre-fit-input"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      name="email"
                    />
                  </FormGroup>
                  <FormGroup validationState={validatePhone(this.state.phone)}>
                    <ControlLabel>Phone</ControlLabel>
                    <FormControl
                      className="pre-fit-input"
                      type="tel"
                      value={this.state.phone}
                      onChange={this.handleChange('phone')}
                      name="phone"
                    />
                  </FormGroup>
                  <FormGroup
                    validationState={validateZipCode(this.state.zipCode)}
                  >
                    <ControlLabel>Zip Code</ControlLabel>
                    <FormControl
                      className="pre-fit-input"
                      type="zipcode"
                      value={this.state.zipCode}
                      onChange={this.handleChange('zipCode')}
                      name="zipCode"
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>How did you hear about us?</ControlLabel>
                    <FormControl
                      className="pre-fit-input"
                      componentClass="select"
                      bsSize="sm"
                      value={this.state.referralSource}
                      onChange={this.handleChange('referralSource')}
                    >
                      <option value="Returning Client">Returning Client</option>
                      <option value="Internet Search">Internet Search</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend or Family">Friend or Family</option>
                      <option value="Bike Shop">Bike Shop</option>
                      <option value="Print Media">Print Media</option>
                      <option value="Other">Other</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      className="pre-fit-input"
                      value={this.state.referralSourceDetails}
                      onChange={this.handleChange('referralSourceDetails')}
                      placeholder="Enter name or other referral details"
                      name="referralSourceDetails"
                    />
                  </FormGroup>
                </Panel.Body>
              </Panel>

              <Panel>
                <Panel.Heading>
                  <Panel.Title>Bike Fit Details:</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Form inline>
                    <FormGroup>
                      <ControlLabel>
                        Have you had a bike fit before?
                      </ControlLabel>
                      &nbsp;
                      <Radio
                        inline
                        onChange={this.handleChange('priorBikeFit')}
                        defaultChecked
                        value={false}
                        name="priorBikeFit"
                      >
                        No
                      </Radio>
                      <Radio
                        inline
                        onChange={this.handleChange('priorBikeFit')}
                        value={true}
                        name="priorBikeFit"
                      >
                        Yes
                      </Radio>
                    </FormGroup>
                  </Form>
                  <br />
                  <FormGroup>
                    <ControlLabel>
                      Bike Fit Objectives (Check all that apply)
                    </ControlLabel>
                    <Checkbox
                      onChange={this.handleCheckChange(
                        'objectiveMeasureAndAdvise'
                      )}
                    >
                      Measure and Advise for New Bike Purchase
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveSetUp')}
                    >
                      Set Up New Bike
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveGeneral')}
                    >
                      General Check Up and Refinement
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveRelieve')}
                    >
                      Relieve Pain or Discomfort
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveImprove')}
                    >
                      Improve Performance
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveReplicate')}
                    >
                      Replicate Fit from Another Bike
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveShoe')}
                    >
                      Shoe or Cleat Fit
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveSaddle')}
                    >
                      Saddle Fit
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('objectiveAero')}
                    >
                      Aero Fit
                    </Checkbox>
                  </FormGroup>

                  <FormControl
                    componentClass="textarea"
                    disabled={false}
                    rows="4"
                    spellCheck
                    placeholder="Enter any additional comments here."
                    value={this.state.objectiveComments}
                    onChange={this.handleChange('objectiveComments')}
                  />
                </Panel.Body>
              </Panel>

              <Panel>
                <Panel.Heading>
                  <Panel.Title>Riding Profile:</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <FormGroup>
                    <Form inline>
                      <FormGroup>
                        <ControlLabel>Riding Style</ControlLabel>
                        &nbsp;
                      </FormGroup>
                      <FormGroup>
                        <Radio
                          inline
                          onChange={this.handleChange('ridingStyle')}
                          defaultChecked
                          value="Relaxed"
                          name="ridingStyle"
                        >
                          Relaxed
                        </Radio>
                        <Radio
                          inline
                          onChange={this.handleChange('ridingStyle')}
                          value="Competitive"
                          name="ridingStyle"
                        >
                          Competitive
                        </Radio>
                      </FormGroup>
                    </Form>
                  </FormGroup>
                  <FormGroup>
                    <Form inline>
                      <ControlLabel>Years of Cycling Experience</ControlLabel>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <FormControl
                        type="number"
                        bsSize="small"
                        value={this.state.yearsCycling}
                        onChange={this.handleChange('yearsCycling')}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </Form>
                  </FormGroup>
                  <FormGroup>
                    <Form inline>
                      <FormGroup>
                        <ControlLabel>
                          Average Riding Hours Per Week
                        </ControlLabel>
                        &nbsp;&nbsp;
                        <FormControl
                          type="number"
                          bsSize="small"
                          value={this.state.hoursPerWeek}
                          onChange={this.handleChange('hoursPerWeek')}
                          min={0}
                          max={20}
                          step={1}
                        />
                      </FormGroup>
                    </Form>
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>
                      Any Issues with Skills and Confidence? (Check all that
                      apply)
                    </ControlLabel>
                    <Checkbox
                      onChange={this.handleCheckChange('skillsCrashing')}
                    >
                      Crashing (prone to)
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('skillsCornering')}
                    >
                      Cornering (confidence)
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('skillsDescending')}
                    >
                      Descending (max speed/braking)
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('skillsClimbing')}
                    >
                      Climbing (performance/cadence)
                    </Checkbox>
                    <Checkbox onChange={this.handleCheckChange('skillsFlats')}>
                      Flats (speed/cadence)
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange(
                        'skillsWeightDistribution'
                      )}
                    >
                      Weight Distribution (heavy on saddle or bars)
                    </Checkbox>
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>
                      Cycling Goals/Additional Information
                    </ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      disabled={false}
                      rows="4"
                      spellCheck
                      placeholder="Any specific cycling goals or additional information?"
                      value={this.state.cyclingGoals}
                      onChange={this.handleChange('cyclingGoals')}
                    />
                  </FormGroup>
                </Panel.Body>
              </Panel>

              <Panel>
                <Panel.Heading>
                  <Panel.Title>Physical Profile:</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <FormGroup>
                    <Form inline>
                      <FormGroup
                        validationState={validateBirthDate(
                          this.state.birthDate
                        )}
                      >
                        <ControlLabel>Birth Date</ControlLabel>
                        &nbsp;
                        <FormControl
                          type="date"
                          value={this.state.birthDate}
                          onChange={this.handleChange('birthDate')}
                          name="birthDate"
                        />
                      </FormGroup>
                    </Form>
                  </FormGroup>
                  <FormGroup>
                    <Form inline>
                      <FormGroup>
                        <ControlLabel>Gender</ControlLabel>
                        &nbsp;
                      </FormGroup>
                      <FormGroup>
                        <Radio
                          inline
                          onChange={this.handleChange('gender')}
                          defaultChecked
                          value="Male"
                          name="gender"
                        >
                          Male
                        </Radio>
                        <Radio
                          inline
                          onChange={this.handleChange('gender')}
                          value="Female"
                          name="gender"
                        >
                          Female
                        </Radio>
                        <Radio
                          inline
                          onChange={this.handleChange('gender')}
                          value="Non-Binary"
                          name="gender"
                        >
                          Non-Binary
                        </Radio>
                      </FormGroup>
                    </Form>
                  </FormGroup>
                  <FormGroup>
                    <Form inline>
                      <FormGroup
                        validationState={validateHeight(this.state.height)}
                      >
                        <ControlLabel>Height</ControlLabel> &nbsp; &nbsp;
                        <FormControl
                          type="number"
                          bsSize="small"
                          value={this.state.height}
                          onChange={this.handleChange('height')}
                          min={48}
                          max={220}
                          step={0.1}
                        />{' '}
                        &nbsp;
                        <Radio
                          inline
                          onChange={this.handleChange('heightUnits')}
                          defaultChecked
                          value="in."
                          name="heightUnits"
                        >
                          in.
                        </Radio>
                        <Radio
                          inline
                          onChange={this.handleChange('heightUnits')}
                          value="cm."
                          name="heightUnits"
                        >
                          cm.
                        </Radio>
                      </FormGroup>
                    </Form>
                  </FormGroup>
                  <FormGroup>
                    <Form inline>
                      <FormGroup
                        validationState={validateWeight(this.state.weight)}
                      >
                        <ControlLabel>Weight</ControlLabel> &nbsp;&nbsp;
                        <FormControl
                          type="number"
                          bsSize="small"
                          value={this.state.weight}
                          onChange={this.handleChange('weight')}
                          min={25}
                          max={300}
                          step={0.1}
                        />{' '}
                        &nbsp;
                        <Radio
                          inline
                          onChange={this.handleChange('weightUnits')}
                          defaultChecked
                          value="lbs."
                          name="weightUnits"
                        >
                          lbs.
                        </Radio>
                        <Radio
                          inline
                          onChange={this.handleChange('weightUnits')}
                          value="kgs."
                          name="weightUnits"
                        >
                          kgs.
                        </Radio>
                      </FormGroup>
                    </Form>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Physical Considerations</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      disabled={false}
                      rows="4"
                      spellCheck
                      placeholder="Describe any physical injuries, limitations or areas of concern,
 including any injuries or surgeries impacting your riding; back issues; leg length difference; or hearing loss."
                      value={this.state.physicalComments}
                      onChange={this.handleChange('physicalComments')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      Current Areas of Discomfort (Check all that apply)
                    </ControlLabel>
                    <Checkbox
                      onChange={this.handleCheckChange('discomfortFeet')}
                    >
                      Feet
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('discomfortKnees')}
                    >
                      Knees
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('discomfortHips')}
                    >
                      Hips
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('discomfortButt')}
                    >
                      Butt
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange(
                        'discomfortPerineumGenitalia'
                      )}
                    >
                      Perineum or genitalia
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange('discomfortLowerBack')}
                    >
                      Lower Back
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange(
                        'discomfortShouldersNeck'
                      )}
                    >
                      Shoulders or Neck
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleCheckChange(
                        'discomfortHandsWristsElbows'
                      )}
                    >
                      Hands, Wrists or Elbows
                    </Checkbox>

                    <Checkbox
                      onChange={this.handleCheckChange('discomfortOther')}
                    >
                      Other
                    </Checkbox>
                    {this.state.discomfortOther && (
                      <FormControl
                        className="pre-fit-input"
                        bsSize="sm"
                        value={this.state.discomfortOtherText}
                        onChange={this.handleChange('discomfortOtherText')}
                      />
                    )}
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Other Physical Activities</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      disabled={false}
                      rows="4"
                      spellCheck
                      placeholder="Any other regular physical activities?"
                      value={this.state.otherPhysicalActivities}
                      onChange={this.handleChange('otherPhysicalActivities')}
                    />
                  </FormGroup>
                </Panel.Body>
              </Panel>

              {!this.state.objectiveMeasureAndAdvise && (
                <Panel>
                  <Panel.Heading>
                    <Panel.Title>Current Bike Details:</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <Form>
                      <FormGroup>
                        <ControlLabel>Type of Bike</ControlLabel>
                        <FormControl
                          className="pre-fit-input"
                          componentClass="select"
                          bsSize="sm"
                          value={this.state.bikeType}
                          onChange={this.handleChange('bikeType')}
                        >
                          <option value="Road Bike">Road Bike</option>
                          <option value="Mountain Bike">Mountain</option>
                          <option value="TT/Tri Bike">
                            Triathalon or Time Trial
                          </option>
                          <option value="Gravel">Gravel</option>
                          <option value="Cyclocross">Cyclocross</option>
                          <option value="Touring or Commuting">
                            Touring or Commuting
                          </option>
                          <option value="Tandem">Tandem</option>
                        </FormControl>
                      </FormGroup>
                    </Form>

                    <FormGroup>
                      <Form inline>
                        <ControlLabel>Make</ControlLabel>
                        &nbsp;&nbsp;
                        <FormControl
                          bsSize="sm"
                          value={this.state.bikeMake}
                          onChange={this.handleChange('bikeMake')}
                        />
                        &nbsp;&nbsp;
                      </Form>
                    </FormGroup>
                    <FormGroup>
                      <Form inline>
                        <ControlLabel>Model</ControlLabel> &nbsp;&nbsp;
                        <FormControl
                          bsSize="sm"
                          value={this.state.bikeModel}
                          onChange={this.handleChange('bikeModel')}
                        />
                      </Form>
                    </FormGroup>
                    <FormGroup>
                      <Form inline>
                        <ControlLabel>Frame Size</ControlLabel>
                        &nbsp;&nbsp;
                        <FormControl
                          bsSize="sm"
                          value={this.state.bikeFrameSize}
                          onChange={this.handleChange('bikeFrameSize')}
                        />
                        &nbsp;&nbsp;
                      </Form>
                    </FormGroup>
                    <FormControl
                      componentClass="textarea"
                      disabled={false}
                      rows="4"
                      spellCheck
                      placeholder="Enter any additional comments here."
                      value={this.state.bikeComments}
                      onChange={this.handleChange('bikeComments')}
                    />
                  </Panel.Body>
                </Panel>
              )}

              {this.state.objectiveMeasureAndAdvise && (
                <Panel>
                  <Panel.Heading>
                    <Panel.Title>New Bike Details:</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <Form>
                      <FormGroup>
                        <ControlLabel>Type of Bike</ControlLabel>
                        <FormControl
                          className="pre-fit-input"
                          componentClass="select"
                          bsSize="sm"
                          value={this.state.bikeType}
                          onChange={this.handleChange('bikeType')}
                        >
                          <option value="Road Bike">Road Bike</option>
                          <option value="Mountain Bike">Mountain Bike</option>
                          <option value="TT/Tri Bike">
                            Triathalon or Time Trial
                          </option>
                          <option value="Gravel">Gravel</option>
                          <option value="Cyclocross">Cyclocross</option>
                          <option value="Touring or Commuting">
                            Touring or Commuting
                          </option>
                          <option value="Tandem">Tandem</option>
                        </FormControl>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel>
                          Is this a new style of bike for you?
                        </ControlLabel>
                        &nbsp;
                        <Radio
                          onChange={this.handleChange('bikeNewStyle')}
                          defaultChecked
                          value={false}
                          name="bikeNewStyle"
                        >
                          No
                        </Radio>
                        <Radio
                          onChange={this.handleChange('bikeNewStyle')}
                          value={true}
                          name="bikeNewStyle"
                        >
                          Yes
                        </Radio>
                      </FormGroup>
                    </Form>

                    <FormGroup>
                      <ControlLabel>Reasons for Purchase</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        disabled={false}
                        rows="4"
                        spellCheck
                        placeholder="Describe your main reaons for getting a new bike."
                        value={this.state.bikeReasons}
                        onChange={this.handleChange('bikeReasons')}
                      />
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>
                        How do you plan to buy? (Check all that apply)
                      </ControlLabel>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeChannelNew')}
                      >
                        New
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeChannelUsed')}
                      >
                        Used
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeChannelInStore')}
                      >
                        In Store
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeChannelOnline')}
                      >
                        Online
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeChannelCustomFrameBuilder'
                        )}
                      >
                        Custom Frame Builder
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeChannelFullyBuilt'
                        )}
                      >
                        Fully Built and Ready to Ride
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeChannelFrameOnly'
                        )}
                      >
                        Frame Only
                      </Checkbox>
                    </FormGroup>

                    <FormGroup>
                      <Form inline>
                        <ControlLabel>Budget</ControlLabel>
                        &nbsp;&nbsp;
                        <FormControl
                          bsSize="sm"
                          value={this.state.bikeBudget}
                          onChange={this.handleChange('bikeBudget')}
                        />
                        &nbsp;&nbsp;
                      </Form>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>
                        Brands or Models Under Consideration
                      </ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        disabled={false}
                        rows="4"
                        spellCheck
                        placeholder="List any particular bike brands or models you are interested in."
                        value={this.state.bikeBrandsModels}
                        onChange={this.handleChange('bikeBrandsModels')}
                      />
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel>
                        What are the main factors that will affect your
                        decision? (Check all that apply)
                      </ControlLabel>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeFactorBrandModel'
                        )}
                      >
                        Brand/Model
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeFactorComponents'
                        )}
                      >
                        Components
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeFactorValue')}
                      >
                        Value
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeFactorAvailability'
                        )}
                      >
                        Availability
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeFactorReviews')}
                      >
                        Reviews
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeFactorReputation'
                        )}
                      >
                        Reputation
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeFactorCost')}
                      >
                        Cost
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeFactorFit')}
                      >
                        Fit
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange(
                          'bikeFactorAppearance'
                        )}
                      >
                        Appearance
                      </Checkbox>
                      <Checkbox
                        onChange={this.handleCheckChange('bikeFactorOther')}
                      >
                        Other
                      </Checkbox>
                      {this.state.bikeFactorOther && (
                        <FormControl
                          className="pre-fit-input"
                          bsSize="sm"
                          value={this.state.bikeFactorOtherText}
                          onChange={this.handleChange('bikeFactorOtherText')}
                        />
                      )}
                    </FormGroup>
                  </Panel.Body>
                </Panel>
              )}

              <Panel>
                <Panel.Heading>
                  <Panel.Title>Media Permission:</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <FormGroup>
                    <FormControl.Static>
                      You may be filmed or photographed during your bike fitting
                      session. We will not post video or images of you on our
                      website and/or social media pages without your consent.{' '}
                    </FormControl.Static>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      Would you like to provide us with consent?
                    </ControlLabel>
                    &nbsp;
                    <Radio
                      onChange={this.handleChange('mediaConsent')}
                      value="Yes"
                      name="mediaConsent"
                    >
                      Yes
                    </Radio>
                    <Radio
                      onChange={this.handleChange('mediaConsent')}
                      value="No"
                      name="mediaConsent"
                    >
                      No
                    </Radio>
                  </FormGroup>
                </Panel.Body>
              </Panel>
            </Panel.Body>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={popoverSubmit}
            >
              <Panel.Footer>
                Thanks for completing the pre-fit interview. Please
                click:&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  color="primary"
                  disabled={!this.validateForm()}
                  onClick={this.clickSubmitPreFitInterview}
                >
                  Submit
                </Button>
              </Panel.Footer>
            </OverlayTrigger>
          </Panel>
        </div>
      )
  }
}

export default PreFitInterview
