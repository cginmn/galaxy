"use strict";define(["utils/utils","mvc/ui/ui-misc","mvc/ui/ui-modal","mvc/tool/tool-form-base","mvc/webhooks"],function(e,t,o,i,a){return{View:Backbone.View.extend({initialize:function(a){var s=this;this.modal=parent.Galaxy.modal||new o.View,this.form=new i(e.merge({listen_to_history:!0,always_refresh:!1,customize:function(e){var o=e.model.attributes;o.buttons={execute:execute_btn=new t.Button({icon:"fa-check",tooltip:"Execute: "+o.name+" ("+o.version+")",title:"Execute",cls:"ui-button btn btn-primary",floating:"clear",onclick:function(){execute_btn.wait(),e.portlet.disable(),s.submit(o,function(){execute_btn.unwait(),e.portlet.enable()})}})},o.job_id&&o.job_remap&&o.inputs.push({label:"Resume dependencies from this job",name:"rerun_remap_job_id",type:"select",display:"radio",ignore:"__ignore__",value:"__ignore__",options:[["Yes",o.job_id],["No","__ignore__"]],help:"The previous run of this tool failed and other tools were waiting for it to finish successfully. Use this option to resume those tools using the new output(s) of this tool run."})},postchange:function(t,o){var i={tool_id:o.model.get("id"),tool_version:o.model.get("version"),inputs:$.extend(!0,{},o.data.create())};o.wait(!0),Galaxy.emit.debug("tool-form::postchange()","Sending current state.",i),e.request({type:"POST",url:Galaxy.root+"api/tools/"+o.model.get("id")+"/build",data:i,success:function(e){o.update(e),o.wait(!1),Galaxy.emit.debug("tool-form::postchange()","Received new model.",e),t.resolve()},error:function(e){Galaxy.emit.debug("tool-form::postchange()","Refresh request failed.",e),t.reject()}})}},a)),this.deferred=this.form.deferred,this.setElement("<div/>"),this.$el.append(this.form.$el)},submit:function(t,o){var i=this,s={tool_id:t.id,tool_version:t.version,inputs:this.form.data.create()};if(this.form.trigger("reset"),!i.validate(s))return Galaxy.emit.debug("tool-form::submit()","Submission canceled. Validation failed."),void(o&&o());if(t.action!==Galaxy.root+"tool_runner/index"){var r=$("<form/>").attr({action:t.action,method:t.method,enctype:t.enctype});return _.each(s.inputs,function(e,t){r.append($("<input/>").attr({name:t,value:e}))}),r.hide().appendTo("body").submit().remove(),void(o&&o())}Galaxy.emit.debug("tool-form::submit()","Validation complete.",s),e.request({type:"POST",url:Galaxy.root+"api/tools",data:s,success:function(e){if(o&&o(),i.$el.children().hide(),i.$el.append(i._templateSuccess(e)),e.jobs&&e.jobs.length>0){i.$el.append($("<div/>",{id:"webhook-view"}));new a.WebhookView({urlRoot:Galaxy.root+"api/webhooks/tool"})}parent.Galaxy&&parent.Galaxy.currHistoryPanel&&parent.Galaxy.currHistoryPanel.refreshContents()},error:function(e){o&&o(),Galaxy.emit.debug("tool-form::submit","Submission failed.",e);var t=!1;if(e&&e.err_data){var a=i.form.data.matchResponse(e.err_data);for(var r in a){i.form.highlight(r,a[r]),t=!0;break}}t||i.modal.show({title:"Job submission failed",body:i._templateError(s,e&&e.err_msg),buttons:{Close:function(){i.modal.hide()}}})}})},validate:function(e){var t=e.inputs,o=-1,i=null;for(var a in t){var s=t[a],r=this.form.data.match(a),n=this.form.field_list[r],l=this.form.input_list[r];if(r&&l&&n){if(!l.optional&&null==s)return this.form.highlight(r),!1;if(s&&s.batch){var u=s.values.length,d=u>0&&s.values[0]&&s.values[0].src;if(d)if(null===i)i=d;else if(i!==d)return this.form.highlight(r,"Please select either dataset or dataset list fields for all batch mode fields."),!1;if(-1===o)o=u;else if(o!==u)return this.form.highlight(r,"Please make sure that you select the same number of inputs for all batch mode fields. This field contains <b>"+u+"</b> selection(s) while a previous field contains <b>"+o+"</b>."),!1}}else Galaxy.emit.debug("tool-form::validate()","Retrieving input objects failed.")}return!0},_templateSuccess:function(e){if(e.jobs&&e.jobs.length>0){var t=e.jobs.length,o=1==t?"1 job has":t+" jobs have",i=$("<div/>").addClass("donemessagelarge").append($("<p/>").text(o+" been successfully added to the queue - resulting in the following datasets:"));return _.each(e.outputs,function(e){i.append($("<p/>").addClass("messagerow").append($("<b/>").text(e.hid+": "+e.name)))}),i.append($("<p/>").append("<b/>").text("You can check the status of queued jobs and view the resulting data by refreshing the History pane. When the job has been run the status will change from 'running' to 'finished' if completed successfully or 'error' if problems were encountered.")),i}return this._templateError(e,"Invalid success response. No jobs found.")},_templateError:function(e,t){return $("<div/>").addClass("errormessagelarge").append($("<p/>").text("The server could not complete the request. Please contact the Galaxy Team if this error persists. "+(t||""))).append($("<pre/>").text(JSON.stringify(e,null,4)))}})}});
//# sourceMappingURL=../../../maps/mvc/tool/tool-form.js.map
