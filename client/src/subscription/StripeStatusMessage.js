import React from 'react'
import { Button, Glyphicon, Well } from 'react-bootstrap'
import PaymentMethod from './PaymentMethod'
import clientconfig from './../clientconfig/config'

const StripeStatusMessage = (props) => {
  switch (props.status) {
    case 'none':
      return (
        <div>
          <Well>
            You currently have access to the Quick Size calculator, which is
            free of charge. <p />
            Upgrade to Quick Fit for the following additional features:
            <p />
            <ul>
              <li>
                Additional calculations based on shoulder width and sit bone
                width.
              </li>
              <li>
                Cloud storage of customer sizing data, contact information,
                notes and recommendations.
              </li>
              <li>
                Cloud storage of key bike fit measurements for each bike owned
                by a customer.
              </li>
              <li>
                Summary PDF reports for printing or emailing to customers.
              </li>
              <li>
                Pre-fit interview forms and automated customer intake process.
              </li>
              <li>Customized bike shop or fitting studio branding.</li>
            </ul>
            Try risk free for {clientconfig.trialPeriod} days. You will not be
            charged until your trial period ends. You may cancel at any time.
          </Well>
          <Button
            id="newCustomer"
            value="newCustomer"
            onClick={props.setSubscriptionView}
          >
            Upgrade to Quick Fit (start free trial)
          </Button>
        </div>
      )

    case 'trialing':
      return (
        <div>
          <Well>
            <p>
              You are currently subscribed to <b>Quick Fit</b> and your{' '}
              {clientconfig.trialPeriod}
              -day trial is active.
            </p>
            <p>
              Your {clientconfig.trialPeriod}
              -day trial will expire on:{' '}
              <b>{props.currentStop.toDateString()}</b>. Unless you cancel your
              subscription before <b>{props.currentStop.toDateString()}</b>,
              your subscription will automatically renew on such date, and you
              will be charged based on your selected payment frequency.
            </p>
            <p>
              Your payment frequency is:{' '}
              <b>
                {props.stripeSubscription.plan.interval === 'month' &&
                  ' Monthly'}
                {props.stripeSubscription.plan.interval === 'year' && ' Yearly'}
              </b>
            </p>
            <p>
              Your subscription will automatically renew on:{' '}
              <b>{props.currentStop.toDateString()}</b>
            </p>
            <br />
            <PaymentMethod
              user={props.user}
              stripeCard={props.stripeCard}
              stripeCustomer={props.stripeCustomer}
              setSubscriptionView={props.setSubscriptionView}
            />
          </Well>
          <Button
            id="changeSubscription"
            value="changeSubscription"
            onClick={props.setSubscriptionView}
          >
            Change Your Subscription
          </Button>
        </div>
      )

    case 'trialing and cancelation pending':
      return (
        <div>
          <Well>
            <p>
              <Glyphicon glyph="exclamation-sign" /> Cancelation Pending.
            </p>
            <p>
              You are currently subscribed to Quick Fit and your{' '}
              {clientconfig.trialPeriod}
              -day trial is active.
            </p>
            <p> However, you previously canceled your subscription.</p>
            <p>
              Your subscription will be canceled automatically at the end of the
              trial period on: <b>{props.currentStop.toDateString()}.</b>
            </p>
            <p>
              You may reactivate your subscription at any time prior to
              cancelation.
            </p>
          </Well>
          <Button
            id="reactivateSubscription"
            value="reactivateSubscription"
            onClick={props.toggleReactivateSubscription}
          >
            Reactivate Your Subscription
          </Button>
        </div>
      )

    case 'active':
      return (
        <div>
          <Well>
            <p>
              You are currently subscribed to: <b>Quick Fit</b>
            </p>
            <p>
              Your payment frequency is:{' '}
              <b>
                {props.stripeSubscription.plan.interval === 'month' &&
                  ' Monthly'}
                {props.stripeSubscription.plan.interval === 'year' && ' Yearly'}
              </b>
            </p>
            <p>
              Your subscription will automatically renew on:{' '}
              <b>{props.currentStop.toDateString()}</b>
            </p>
            <PaymentMethod
              user={props.user}
              stripeCard={props.stripeCard}
              stripeCustomer={props.stripeCustomer}
              setSubscriptionView={props.setSubscriptionView}
            />
          </Well>
          <Button
            id="changeSubscription"
            value="changeSubscription"
            onClick={props.setSubscriptionView}
          >
            Change Your Subscription
          </Button>
        </div>
      )

    case 'active and cancelation pending':
      return (
        <div>
          <Well>
            <p>
              <Glyphicon glyph="exclamation-sign" /> Cancelation Pending.
            </p>
            <p>
              You are currently subscribed to: <b>Quick Fit</b>
            </p>
            <p>However, You previously canceled your subscription.</p>
            <p>
              Your subscription will be canceled automatically at the end of the
              current billing period on:{' '}
              <b>{props.currentStop.toDateString()}</b>
            </p>
            <p>
              You may reactivate your subscription at any time prior to
              cancelation.
            </p>
          </Well>
          <Button onClick={props.toggleReactivateSubscription}>
            Reactivate Your Subscription
          </Button>
        </div>
      )

    case 'canceled':
      return (
        <div>
          <Well>
            <p>
              Your subscription to Quick Fit was canceled on{' '}
              <b>{props.canceledAt.toDateString()}</b> and is no longer active.
            </p>
            <p>But don't worry, all of your data is saved.</p>
            <p>
              To use Quick Fit again and restore access to your data, please
              purchase a new subscription.
            </p>
          </Well>
          <Button
            id="existingCustomer"
            value="existingCustomer"
            onClick={props.setSubscriptionView}
          >
            Purchase New Subscription
          </Button>
        </div>
      )

    case 'past_due':
      return (
        <div>
          <Well>
            <p>
              Your subscription to Quick Fit expired on{' '}
              <b>{props.currentStop.toDateString()}</b> and we were unable to
              charge the renewal fee automatically.
            </p>
            <p>But don't worry, all of your data is saved.</p>
            <p>
              To use Quick Fit again and restore access to your data, please
              update your payment method.
            </p>
          </Well>
          <Button
            id="past_due"
            value="changePaymentMethod"
            onClick={props.setSubscriptionView}
          >
            Update Payment Method
          </Button>
        </div>
      )

    default:
      return null
  }
}

export default StripeStatusMessage
