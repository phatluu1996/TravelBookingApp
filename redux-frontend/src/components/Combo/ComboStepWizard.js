import React from 'react'
import StepWizard from 'react-step-wizard'
import ComboFlightSearchPage from './ComboFlightSearchPage'
import ComboHotelSearchPage from './ComboHotelSearchPage'

const ComboStepWizard = () => {
    return (<>
        <StepWizard>
            <ComboFlightSearchPage></ComboFlightSearchPage>
            <ComboHotelSearchPage></ComboHotelSearchPage>
        </StepWizard>
    </>)
}

export default ComboStepWizard
