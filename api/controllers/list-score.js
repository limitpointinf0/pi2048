module.exports = {


    friendlyName: 'View Game and Scores',
  
  
    description: 'Display "Home" page.',
  
  
    exits: {
  
        success: {
            viewTemplatePath: 'pages/game'
        }
  
    },
  
  
    fn: async function () {

        var scores = await sails.models.userscores.find({});
        // Respond with view.
        return {
            scores: scores,
        };
    }
  
  
};