FS.debug = true;
Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: 'public/usr_img/test'})]
});


if (Meteor.isClient){

  Template.hello.helpers({
    fshttp: function (){
        //console.log(FS.HTTP.uploadUrl);
        //FS.HTTP.uploadUrl = 'http://192.168.1.5:3000/cfs/files';
        return FS.HTTP.uploadUrl;
    }
  });

  Template.imageView.helpers({
    images: function () {
        //console.log("passed through image id:" + this.img_id);
        return Images.find(); // Where Images is an FS.Collection instance
    }
  });

  Template.hello.events({
    'change #upload-btn': function (event, template) {
        var files = event.target.files;
        console.log(files.length);
        for (var i = 0, ln = files.length; i < ln; i++) {
          Images.insert(files[i], function (err, fileObj) {
            //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
          });
        }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}