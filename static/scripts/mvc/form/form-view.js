"use strict";define(["utils/utils","mvc/ui/ui-portlet","mvc/ui/ui-misc","mvc/form/form-section","mvc/form/form-data"],function(t,e,i,s,n){return Backbone.View.extend({initialize:function(t){this.model=new Backbone.Model({initial_errors:!1,cls:"ui-portlet-limited",icon:null,always_refresh:!0,message_status:"warning"}).set(t),this.setElement("<div/>"),this.render()},update:function(t){var e=this;this.data.matchModel(t,function(t,i){var s=e.input_list[i];if(s&&s.options&&!_.isEqual(s.options,t.options)){s.options=t.options;var n=e.field_list[i];if(n.update){var a=[];if(-1!=["data","data_collection","drill_down"].indexOf(s.type))a=s.options;else for(var o in t.options){var r=t.options[o];r.length>2&&a.push({label:r[0],value:r[1]})}n.update(a),n.trigger("change"),Galaxy.emit.debug("form-view::update()","Updating options for "+i)}}})},wait:function(t){for(var e in this.input_list){var i=this.field_list[e];this.input_list[e].is_dynamic&&i.wait&&i.unwait&&i[t?"wait":"unwait"]()}},highlight:function(t,e,i){var s=this.element_list[t];if(s&&(s.error(e||"Please verify this parameter."),this.portlet.expand(),this.trigger("expand",t),!i)){var n=this.$el.parents().filter(function(){return-1!=["auto","scroll"].indexOf($(this).css("overflow"))}).first();n.animate({scrollTop:n.scrollTop()+s.$el.offset().top-120},500)}},errors:function(t){if(this.trigger("reset"),t&&t.errors){var e=this.data.matchResponse(t.errors);for(var i in this.element_list){this.element_list[i];e[i]&&this.highlight(i,e[i],!0)}}},render:function(){var t=this;this.off("change"),this.off("reset"),this.field_list={},this.input_list={},this.element_list={},this.data=new n.Manager(this),this._renderForm(),this.data.create(),this.model.get("initial_errors")&&this.errors(this.model.attributes);var e=this.data.checksum();return this.on("change",function(i){var s=t.input_list[i];if(!s||s.refresh_on_change||t.model.get("always_refresh")){var n=t.data.checksum();n!=e&&(e=n,t.model.get("onchange")&&t.model.get("onchange")())}}),this.on("reset",function(){_.each(t.element_list,function(t){t.reset()})}),this},_renderForm:function(){$(".tooltip").remove();var t=this.model.attributes;this.message=new i.UnescapedMessage,this.section=new s.View(this,{inputs:t.inputs}),this.portlet=new e.View({icon:t.icon,title:t.title,cls:t.cls,operations:t.operations,buttons:t.buttons,collapsible:t.collapsible,collapsed:t.collapsed,onchange_title:t.onchange_title}),this.portlet.append(this.message.$el),this.portlet.append(this.section.$el),this.$el.empty(),t.inputs&&this.$el.append(this.portlet.$el),t.message&&this.message.update({persistent:!0,status:t.message_status,message:t.message}),Galaxy.emit.debug("form-view::initialize()","Completed")}})});
//# sourceMappingURL=../../../maps/mvc/form/form-view.js.map
