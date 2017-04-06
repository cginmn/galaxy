"use strict";define(["mvc/dataset/states","mvc/base-mvc","utils/localization"],function(e,t,i){var a=t.SearchableModelMixin,n=Backbone.Model.extend(t.LoggableMixin).extend(t.mixin(a,{_logNamespace:"dataset",defaults:{state:e.NEW,deleted:!1,purged:!1,name:"(unnamed dataset)",accessible:!0,data_type:"",file_ext:"",file_size:0,meta_files:[],misc_blurb:"",misc_info:"",tags:[]},initialize:function(t,i){this.debug(this+"(Dataset).initialize",t,i),this.get("accessible")||this.set("state",e.NOT_VIEWABLE),this.urls=this._generateUrls(),this._setUpListeners()},_generateUrls:function(){var e=this.get("id");if(!e)return{};var t={purge:"datasets/"+e+"/purge_async",display:"datasets/"+e+"/display/?preview=True",edit:"datasets/"+e+"/edit",download:"datasets/"+e+"/display?to_ext="+this.get("file_ext"),report_error:"dataset/errors?id="+e,rerun:"tool_runner/rerun?id="+e,show_params:"datasets/"+e+"/show_params",visualization:"visualization",meta_download:"dataset/get_metadata_file?hda_id="+e+"&metadata_name="};return _.each(t,function(e,i){t[i]=Galaxy.root+e}),this.urls=t,t},_setUpListeners:function(){this.on("change:state",function(e,t){this.log(this+" has changed state:",e,t),this.inReadyState()&&this.trigger("state:ready",e,t,this.previous("state"))}),this.on("change:id change:file_ext",function(e){this._generateUrls()})},toJSON:function(){var e=Backbone.Model.prototype.toJSON.call(this);return _.extend(e,{urls:this.urls})},isDeletedOrPurged:function(){return this.get("deleted")||this.get("purged")},inReadyState:function(){var t=_.contains(e.READY_STATES,this.get("state"));return this.isDeletedOrPurged()||t},hasDetails:function(){return!this.get("accessible")||this.has("annotation")},hasData:function(){return this.get("file_size")>0},fetch:function(e){var t=this;return Backbone.Model.prototype.fetch.call(this,e).always(function(){t._generateUrls()})},parse:function(e,t){var i=Backbone.Model.prototype.parse.call(this,e,t);return i.create_time&&(i.create_time=new Date(i.create_time)),i.update_time&&(i.update_time=new Date(i.update_time)),i},save:function(e,t){return t=t||{},t.wait=!!_.isUndefined(t.wait)||t.wait,Backbone.Model.prototype.save.call(this,e,t)},delete:function(e){return this.get("deleted")?jQuery.when():this.save({deleted:!0},e)},undelete:function(e){return!this.get("deleted")||this.get("purged")?jQuery.when():this.save({deleted:!1},e)},purge:function(e){if(this.get("purged"))return jQuery.when();e=e||{},e.url=this.urls.purge;var t=this,a=jQuery.ajax(e);return a.done(function(e,i,a){t.set({deleted:!0,purged:!0})}),a.fail(function(a,n,s){var r=i("Unable to purge dataset");a.responseJSON&&a.responseJSON.error?r=a.responseJSON.error:-1!==a.responseText.indexOf("Removal of datasets by users is not allowed in this Galaxy instance")&&(r="Removal of datasets by users is not allowed in this Galaxy instance"),a.responseText=r,t.trigger("error",t,a,e,i(r),{error:r})}),a},searchAttributes:["name","file_ext","genome_build","misc_blurb","misc_info","annotation","tags"],searchAliases:{title:"name",format:"file_ext",database:"genome_build",blurb:"misc_blurb",description:"misc_blurb",info:"misc_info",tag:"tags"},toString:function(){var e=this.get("id")||"";return this.get("name")&&(e='"'+this.get("name")+'",'+e),"Dataset("+e+")"}}));return{DatasetAssociation:n,DatasetAssociationCollection:Backbone.Collection.extend(t.LoggableMixin).extend({_logNamespace:"dataset",model:n,urlRoot:Galaxy.root+"api/datasets",url:function(){return this.urlRoot},ids:function(){return this.map(function(e){return e.get("id")})},notReady:function(){return this.filter(function(e){return!e.inReadyState()})},haveDetails:function(){return this.all(function(e){return e.hasDetails()})},ajaxQueue:function(e,t){var i=jQuery.Deferred(),a=this.length,n=[];if(!a)return i.resolve([]),i;var s=this.chain().reverse().map(function(r,o){return function(){var u=e.call(r,t);u.done(function(e){i.notify({curr:o,total:a,response:e,model:r})}),u.always(function(e){n.push(e),s.length?s.shift()():i.resolve(n)})}}).value();return s.shift()(),i},matches:function(e){return this.filter(function(t){return t.matches(e)})},toString:function(){return["DatasetAssociationCollection(",this.length,")"].join("")}})}});
//# sourceMappingURL=../../../maps/mvc/dataset/dataset-model.js.map
