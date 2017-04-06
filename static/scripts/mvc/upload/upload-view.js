"use strict";define(["utils/utils","mvc/ui/ui-modal","mvc/ui/ui-tabs","mvc/upload/upload-button","mvc/upload/default/default-view","mvc/upload/composite/composite-view","mvc/upload/collection/collection-view"],function(t,e,i,o,s,n,l){return Backbone.View.extend({options:{nginx_upload_path:"",ftp_upload_site:"n/a",default_genome:"?",default_extension:"auto",height:500,width:900,auto:{id:"auto",text:"Auto-detect",description:"This system will try to detect the file type automatically. If your file is not detected properly as one of the known formats, it most likely means that it has some format problems (e.g., different number of columns on different rows). You can still coerce the system to set your data to the format you think it should be.  You can also upload compressed files, which will automatically be decompressed."}},list_extensions:[],list_genomes:[],initialize:function(e){var i=this;this.options=t.merge(e,this.options),this.ui_button=new o.View({onclick:function(t){t.preventDefault(),i.show()},onunload:function(){var t=i.ui_button.model.get("percentage",0);if(t>0&&t<100)return"Several uploads are queued."}}),this.setElement(this.ui_button.$el);var i=this;t.get({url:Galaxy.root+"api/datatypes?extension_only=False",success:function(t){for(key in t)i.list_extensions.push({id:t[key].extension,text:t[key].extension,description:t[key].description,description_url:t[key].description_url,composite_files:t[key].composite_files});i.list_extensions.sort(function(t,e){var i=t.text&&t.text.toLowerCase(),o=e.text&&e.text.toLowerCase();return i>o?1:i<o?-1:0}),i.options.datatypes_disable_auto||i.list_extensions.unshift(i.options.auto)}}),t.get({url:Galaxy.root+"api/genomes",success:function(t){for(key in t)i.list_genomes.push({id:t[key][1],text:t[key][0]});i.list_genomes.sort(function(t,e){return t.id==i.options.default_genome?-1:e.id==i.options.default_genome?1:t.text>e.text?1:t.text<e.text?-1:0})}})},show:function(){var t=this;if(!Galaxy.currHistoryPanel||!Galaxy.currHistoryPanel.model)return void window.setTimeout(function(){t.show()},500);this.current_user=Galaxy.user.id,this.modal||(this.tabs=new i.View,this.default_view=new s(this),this.tabs.add({id:"regular",title:"Regular",$el:this.default_view.$el}),this.composite_view=new n(this),this.tabs.add({id:"composite",title:"Composite",$el:this.composite_view.$el}),this.collection_view=new l(this),this.tabs.add({id:"collection",title:"Collection",$el:this.collection_view.$el}),this.modal=new e.View({title:"Download from web or upload from disk",body:this.tabs.$el,height:this.options.height,width:this.options.width,closing_events:!0,title_separator:!1})),this.modal.show()},currentHistory:function(){return this.current_user&&Galaxy.currHistoryPanel.model.get("id")},currentFtp:function(){return this.current_user&&this.options.ftp_upload_site},toData:function(t,e){var i={payload:{tool_id:"upload1",history_id:e||this.currentHistory(),inputs:{}},files:[],error_message:null};if(t&&t.length>0){var o={};o.dbkey=t[0].get("genome",null),o.file_type=t[0].get("extension",null);for(var s in t){var n=t[s];if(n.set("status","running"),!(n.get("file_size")>0)){i.error_message="Upload content incomplete.",n.set("status","error"),n.set("info",i.error_message);break}var l="files_"+s+"|";switch(o[l+"type"]="upload_dataset",o[l+"space_to_tab"]=n.get("space_to_tab")&&"Yes"||null,o[l+"to_posix_lines"]=n.get("to_posix_lines")&&"Yes"||null,n.get("file_mode")){case"new":o[l+"url_paste"]=n.get("url_paste");break;case"ftp":o[l+"ftp_files"]=n.get("file_path");break;case"local":i.files.push({name:l+"file_data",file:n.get("file_data")})}}i.payload.inputs=JSON.stringify(o)}return i}})});
//# sourceMappingURL=../../../maps/mvc/upload/upload-view.js.map
