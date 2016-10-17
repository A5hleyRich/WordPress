(function( $, wp, settings ) {
	wp = wp || {};

	/**
	 * The WP checkUpdates object.
	 *
	 * @type {object}
	 */
	wp.checkUpdates = {};

	/**
	 * Current update counts.
	 *
	 * @type {object}
	 */
	wp.checkUpdates.currentCounts = settings.current_updates.counts;

	/**
	 * Current update string.
	 *
	 * @type {string}
	 */
	wp.checkUpdates.currentTitle = settings.current_updates.title;

	/**
	 * Perform check.
	 */
	wp.checkUpdates.performCheck = function() {
		wp.ajax.post( 'check-updates', settings ).done( function( response ) {
			wp.checkUpdates.updateDashboardMenu( response );
			wp.checkUpdates.updatePluginsMenu( response );
			wp.checkUpdates.updateFooter( response );
		});
	};

	/**
	 * Update dashboard menu.
	 *
	 * @param {object} response Response from the server.
	 */
	wp.checkUpdates.updateDashboardMenu = function ( response ) {
		if ( response.counts.total === wp.checkUpdates.currentCounts.total ) {
			return;
		}

		var $menu = $( '#menu-dashboard' );

		$menu.find( '.update-count' ).text( response.counts.total );
		$menu.find( '.update-plugins' ).addClass( 'count-' + response.counts.total ).removeClass( 'count-' + wp.checkUpdates.currentCounts.total );
	};

	/**
	 * Update plugins menu.
	 *
	 * @param {object} response Response from the server.
	 */
	wp.checkUpdates.updatePluginsMenu = function( response ) {
		if ( response.counts.plugins === wp.checkUpdates.currentCounts.plugins ) {
			return;
		}

		var $menu = $( '#menu-plugins' );

		$menu.find( '.plugin-count' ).text( response.counts.plugins );
		$menu.find( '.update-plugins' ).addClass( 'count-' + response.counts.plugins ).removeClass( 'count-' + wp.checkUpdates.currentCounts.plugins );
	};

	/**
	 * Update footer.
	 *
	 * @param {object} response Response from the server.
	 */
	wp.checkUpdates.updateFooter = function( response ) {
		if ( response.counts.wordpress === wp.checkUpdates.currentCounts.wordpress ) {
			return;
		}

		$( '#footer-upgrade' ).html( response.message );
	};

	$( function() {
		// Perform update check
		wp.checkUpdates.performCheck();
	} );

})( jQuery, window.wp, window.wpCheckUpdates );