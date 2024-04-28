import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';
import Save from './save';

registerBlockType( 'infinite/team-member', {
	title: __( 'Team Member', 'infinite-team-members' ),
	description: __( 'A team member item', 'infinite-team-members' ),
	icon: 'admin-users',
	parent: [ 'infinite/team-members' ],
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},

	edit: Edit,
	save: Save,
} );
