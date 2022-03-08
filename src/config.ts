const config = {
  /**
   * The maximum time for each player to say a word (in seconds)
   */
  turnTime: Number(process.env.REACT_APP_TIMER) || 8,
  /**
   * The loss percentage of AI
   */
  lossPercentage: Number(process.env.REACT_APP_LOSS_PERCENTAGE) || 30,
  /**
   * The maximum time it takes for AI to say a word (in seconds)
   */
  timeToAnswer: Number(process.env.REACT_APP_TIME_TO_ANSWER) || 3,
};

export default config;
