/**
 * HolonController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

function checkNested(list, key, value) {
  list.forEach(function(item) {
    sails.log.verbose('Checking if', item, 'has', key, '=', value)
    sails.log.verbose('***********************', item[key])
    if (item[key] && item[key] == value) {
      sails.log.verbose('Found', item[key], '!')
      return true
    }
  })
  return false
}

function isDefined(x) {
    var undefined;
    return x !== undefined;
}

module.exports = {

  all: function(req, res) {
    var report = {holons: {}};
    Holon.find()
    .exec(function(err, holons) {

      if (err) { return res.send(err,500); }
      if (holons.length < 1) return res.send("No holons have been setup!", 404);

      Person.find()
      .sort('name')
      .exec(function(err, persons) {

        if (err) { return res.send(err,500); }

        Skill.find()
        .exec(function(err, skills) {

          // bind skills to perons
          skills.forEach(function(skill){
            persons.forEach(function(person){
              if (!isDefined(person.skills))
                person.skills = []
              if (person.id == skill.personId)
                person.skills.push(skill.skill)
            })
          })

          // bind persons to holons
          persons.forEach(function(person){
            holons.forEach(function(holon){
              if (!isDefined(holon.persons))
                holon.persons = []
              if (person.currentHolonId == holon.id)
                holon.persons.push(person)
            })
          })

          report.holons = holons
          sails.log.debug(report)
          return res.view('reports/holons', {'report': report});
        });

      });
    });
  }

};
