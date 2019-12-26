const clientconfig = {
    stripeAPIKey: process.env.STRIPE_API_KEY || "pk_test_0vcUzhimBNZs7qlLw3W6pAdI",
    fksHashSecret: process.env.FKS_HASH_SECRET || "fks_superSecret!00",
    appUrlBase: process.env.APP_URL_BASE || "http://67.161.250.23:3000/",
    annualSubscriptionPrice: process.env.ANNUAL_SUPSCRIPTION_PRICE || "$99.99",
    trialPeriod: process.env.TRIAL_PERIOD || "60"
  }
  
  export default clientconfig
  