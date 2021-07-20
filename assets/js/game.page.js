parasails.registerPage('game', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
  
      scores: [],
      piUser: '',

    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
      this.scores = this._marshalEntries(this.scores);
      console.log(this.scores);
    },
  
    mounted: async function() {
      this.piUser = await this._piAuthen();
      this._navUser();
      this._setHeroHeight();
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
        // Pi Network
        onIncompletePaymentFound: async function(payment) {
          var self = this;
          const url = '/api/v1/finalize-payment/';
          console.log('INCOMPLETE PAYMENT', payment);
          const data = {
            payment_id: payment.identifier,
            transaction_id: payment.transaction.txid,
          };
          const x_csrf_token = window.SAILS_LOCALS._csrf;
          var res = await $.ajax({
            url: url,
            data : JSON.stringify(data),
            contentType: 'application/json',
            method : 'POST',
            headers: {
              'x-csrf-token': x_csrf_token 
            },
            success: function (data) {
              return data;
            },
            error: function (data) { 
              return data; 
            }
          });
        },
        _piAuthen: async function() {
            // Authenticate the user, and get permission to request payments from them:
            var self = this;
            const Pi = window.Pi;
            Pi.init({ version: "2.0", sandbox:true });
            const scopes = ['username','payments'];
            var username = await Pi.authenticate(scopes, self.onIncompletePaymentFound).then(function(auth) {
                return auth.user.username;
            }).catch(function(error) {
                alert(error);
            });
            return username;
        },
    
        _marshalEntries: function(entries) {
            // Marshal provided array of data and return the modified version.
            return _.map(entries, (entry)=>{
            entry.confirm = false;
            return entry;
            });
        },

        _navUser: function() {
          $('#piuser').html('User: ' + this.piUser);
          $('#piusermobile').html('User: ' + this.piUser);
        },    

        _setHeroHeight: function() {
          var $hero = this.$find('[full-page-hero]');
          var headerHeight = $('#page-header').outerHeight();
          var heightToSet = $(window).height();
          heightToSet = Math.max(heightToSet, 500);//« ensure min height of 500px - header height
          heightToSet = Math.min(heightToSet, 1000);//« ensure max height of 1000px - header height
          $hero.css('min-height', heightToSet - headerHeight+'px');
          this.heroHeightSet = true;
        },

    }
  });
  