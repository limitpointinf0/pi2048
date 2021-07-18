module.exports = {


    friendlyName: 'Add or Update Score',
  
  
    description: 'Add or Update User Score',
  
  
    inputs: {
  
        user: {
            type: 'string',
            description: 'username'
        },
        score: {
            type: 'number',
            description: 'score of user'
        },
    },


    exits: {},
  
  
    fn: async function (inputs) {

        console.log(inputs);
        
        // Check for an existing account for this user.
        var existingScore = await sails.models.userscores.findOne({ 
            user: inputs.user
        });
  
        if(existingScore) {
            // Update the record for the logged-in user.
            await existingScore.updateOne({ user: inputs.user })
            .set({
                score: inputs.score
            });
        }
        else {
            var newScore = await sails.models.userscores.create({
                user: inputs.user,
                score: inputs.score
            }).fetch();

            return newScore;
        }
  
    }
  
  
  };
  