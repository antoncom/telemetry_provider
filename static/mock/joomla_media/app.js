import draw2d from './com_teamtimebpm/assets/js/draw2d/bpmn/_init_.js'
import SwimlanePanel from './SwimlanePanel.js'
import credentials from 'src/components/Dashboard/Views/TeamtimeBpm/credentials/credentials.js'

TeamTime.jQuery(window).load(function () {
	var $ = TeamTime.jQuery;
	var buttonsPanel = parent.SwimlanePanelButtons;

	var changeShowInfo = function () {
		var src;
		//var dest;

		src = buttonsPanel.selectorShowInfo;

		// update second selector
		//$(dest).val($(src).val());

		// update info with current selector
		swPanel.showInfo($(src).val());
	};

	var loadWorkflow = function (id) {
		var id=1;
		// url for process
		var url = TeamTime.getUrlForTask("loadDiagram");

		// for template - get other source url
		if (buttonsPanel.isTemplate) {
			url = TeamTime.getUrlForController("template") + "&task=loadDiagram";
		}

		$.ajax({
			type : 'GET',
			url  : 'http://teamlog.teamtime.info/administrator/index.php?option=com_teamtimebpm&controller=process&task=loadDiagram&id=327&username=' + credentials.username + '&passwd=' + credentials.passwd,
			xhrFields: {
				withCredentials: true
			},
			success :  function(data) {
				//data = data.diagram; // ant
				var sJson = new draw2d.bpmn.JsonSerializer();
				var swPanel = draw2d.bpmn.getSwimlanePanel();
				swPanel.clear();
				sJson.unserialize(swPanel, data);

				console.log("diagram loaded");

				changeShowInfo();
			},
			error :  function(data) {
				console.log('ERROR');
				console.log(JSON.stringify(data));
				return;
			}
		});
	};

	// init path for assets
	draw2d.bpmn.assetsUrl = TeamTime.getMediaAssetsUrl();

	var swPanel = new SwimlanePanel();
	draw2d.bpmn.setSwimlanePanel(swPanel);

	swPanel.init();
	loadWorkflow(purl().param("id"));
});