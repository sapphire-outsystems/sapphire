/* Component LayoutBlank */
$(function () {
	if (window.frameElement) {
		if (!!$(this.frameElement).closest('.MainInteractiveCard').length) {
			$('.LayoutBlank.Page').addClass('MainInteractiveCard');
		}
	}




	$('.CLOSE_REMOTE').on('click', function () {
		localStorage.removeItem('RemoteAppointment');
		window.opener.$('.remote-trigger').remove();
		window.close();
	});

	if ($('.LayoutBlank.Page.RemoteAppointment').length > 0) {
		window.addEventListener('blur', function (event) {
			if (!!localStorage.getItem('RemoteAppointment')) {
				window.opener.SapphireWidgets.LayoutBase.showAppointmentTrigger();
			}
		});

		window.addEventListener('focus', function (event) {
			window.opener.SapphireWidgets.LayoutBase.hideAppointmentTrigger();
		});

		window.addEventListener('beforeunload', function (event) {
			localStorage.removeItem('RemoteAppointment');
		});

		window.addEventListener('unload', function (event) {
			localStorage.removeItem('RemoteAppointment');
		});
	}

});