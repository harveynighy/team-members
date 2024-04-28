import { useEffect, useState, useRef } from '@wordpress/element';

import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
	InspectorControls,
} from '@wordpress/block-editor';

import { usePrevious } from '@wordpress/compose';

import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
} from '@wordpress/components';

function Edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {
	const { name, bio, url, alt, id } = attributes;
	const [ blobURL, setBlobURL ] = useState();
	const titleRef = useRef();
	const prevURL = usePrevious( url );

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};

	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	};

	const onChangeAlt = ( newAlt ) => {
		setAttributes( { alt: newAlt } );
	};

	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const onSelectURL = ( newURL ) => {
		setAttributes( {
			url: newURL,
			id: undefined,
			alt: '',
		} );
	};

	const removeImage = () => {
		setAttributes( { url: undefined, alt: '', id: undefined } );
	};

	useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( {
				url: undefined,
				alt: '',
			} );
		}
	}, [] );

	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlobURL();
		}
	}, [ url ] );

	useEffect( () => {
		if ( url && ! prevURL ) {
			titleRef.current.focus();
		}
	}, [ url, prevURL ] );
	return (
		<>
			<InspectorControls>
				{ url && ! isBlobURL( url ) && (
					<PanelBody
						title={ __(
							'Image Settings',
							'infinite-team-members'
						) }
					>
						<TextareaControl
							label={ __( 'Alt Text', 'infinite-team-members' ) }
							value={ alt }
							onChange={ onChangeAlt }
							help={ __(
								'Alt text (alternative text) describes the appearance or function of an image on a web page. Alt text is read aloud by programs called screen readers which are used by people with visual impairments and low vision.',
								'infinite-team-members'
							) }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			{ url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={ __( 'Replace Image', 'infinite-team-members' ) }
						onSelect={ onSelectImage }
						onSelectURL={ onSelectURL }
						onError={ onUploadError }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						mediaId={ id }
						mediaURL={ url }
					/>
					<ToolbarButton onClick={ removeImage }>
						{ __( 'Remove Image', 'infinite-team-members' ) }
					</ToolbarButton>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ url && (
					<div
						className={ `wp-block-infinite-team-member-img ${
							isBlobURL( url ) ? 'is-loading' : ''
						}` }
					>
						<img src={ url } alt={ alt } />
						{ isBlobURL( url ) && <Spinner /> }
					</div>
				) }
				<MediaPlaceholder
					icon="admin-users"
					onSelect={ onSelectImage }
					onSelectURL={ onSelectURL }
					onError={ onUploadError }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					disableMediaButtons={ url }
					notices={ noticeUI }
				/>
				<RichText
					ref={ titleRef }
					placeholder={ __( 'Member Name', 'infinite-team-members' ) }
					tagName="h4"
					onChange={ onChangeName }
					value={ name }
					allowedFormats={ [] }
				/>
				<RichText
					placeholder={ __( 'Member Bio', 'infinite-team-members' ) }
					tagName="p"
					onChange={ onChangeBio }
					value={ bio }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}

export default withNotices( Edit );
