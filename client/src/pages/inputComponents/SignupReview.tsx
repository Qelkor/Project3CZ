import React from 'react'
import Typography from "@mui/material/Typography"

interface PropsReview {
  name: string;
  email: string;
  propertyType: string;
  propertyStatus: string;
  renovationType: string;
  renovationPriority: string;
  keyCollected: boolean | undefined;
  loanRequired: boolean | undefined;
  rooms: string[];
  budget: number;
}


var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'SGD',
});

const MissingField = () => {
  return (<Typography  sx={{mb:1}} variant="body1" color="red">{`*This field is missing`}</Typography>)
}


const SignupReview = ({name, email, propertyType, propertyStatus, renovationType, renovationPriority, keyCollected, loanRequired, rooms, budget}: PropsReview) => {
  return (
    <>
      <Typography variant="h6" color="primary">Username:</Typography>
      {name.length === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{name}</Typography>)  }
      <Typography variant="h6" color="primary">Email:</Typography>
      {email.length === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{email}</Typography>)  }
      <Typography variant="h6" color="primary">Property Type:</Typography>
      {propertyType?.length === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{propertyType}</Typography>)  }
      <Typography variant="h6" color="primary">Property Status:</Typography>
      {propertyStatus?.length === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{propertyStatus}</Typography>)  }
      <Typography variant="h6" color="primary">Keys Collected:</Typography>
      {keyCollected === undefined ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{`${keyCollected}`[0].toUpperCase() + `${keyCollected}`.substring(1)}</Typography>)  }
      <Typography variant="h6" color="primary">Renovation Priority:</Typography>
      {renovationPriority.length === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{renovationPriority}</Typography>)  }
      <Typography variant="h6" color="primary">Renovation Type:</Typography>
      {renovationType.length === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{renovationType}</Typography>)  }
      <Typography variant="h6" color="primary">Loan Required:</Typography>
      {loanRequired === undefined ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{`${loanRequired}`[0].toUpperCase() + `${loanRequired}`.substring(1)}</Typography>)  }
      <Typography variant="h6" color="primary">Budget:</Typography>
      {budget === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{formatter.format(budget)}</Typography>)  }
      <Typography variant="h6" color="primary">Rooms:</Typography>
      {rooms.length === 0 ? (<MissingField />) : (<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{rooms}</Typography>)  }
    </>
  )
}

export default SignupReview