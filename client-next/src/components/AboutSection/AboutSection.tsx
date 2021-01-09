import React, { useState, ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { nanoid } from 'nanoid'

import options from './SubSection'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		// fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		textTransform: 'capitalize',
	},
	accordionDetails: {
		flexWrap: 'wrap',
	},
}))

const Accordion = () => {
	const { heading, accordionDetails } = useStyles()

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'
			>
				{/* <Typography variant='h6' className={heading}> */}
				{/* 	{name} */}
				{/* </Typography> */}
			</AccordionSummary>
			<AccordionDetails className={accordionDetails}>
				{/* <Component {...props} formFields={formFields} name={name} /> */}
			</AccordionDetails>
		</Accordion>
	)
}

const SimpleAccordion = () => {
	const { root } = useStyles()

	return (
		<div className={root}>
			<Accordion />
		</div>
	)
}

export default SimpleAccordion
