import React from 'react'
import { GridColumn, Grid, Image, Label, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
const OutofStock = () => (
  <div className="className='outofstockCom'">
  <Grid columns={2}
    
  >
    <GridColumn>

      <Label as='a' color='red' ribbon>
        Out of Stock
      </Label>

    </GridColumn>


  </Grid>
  </div>
)

export default OutofStock