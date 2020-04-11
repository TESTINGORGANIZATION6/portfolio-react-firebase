import axios from 'axios'

export const getUserDetails = (userLog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userLog.token}`
    }
  }
  return axios
    .get(
      `https://portfolio-api-node.herokuapp.com/api/Player?playerId=${userLog.userId}`,
      config
    )
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const userRegister = (userDetails, userLog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userLog.token}`
    }
  }
  return axios
    .post(
      'https://portfolio-api-node.herokuapp.com/api/Player/create',
      {
        UserId: userLog.userId,
        FirstName: userDetails.FirstName,
        LastName: userDetails.LastName,
        DateOfBirth: userDetails.DateOfBirth,
        Nationality: userDetails.Nationality,
        Height: userDetails.Height,
        Weight: userDetails.Weight,
        Position: userDetails.Position,
        Role: userDetails.Role,
        Foot: userDetails.Foot,
        Skills: userDetails.Skills,
        Agent: userDetails.Agent,
        Clubs: userDetails.Clubs,
        Ratings: userDetails.Ratings,
        Ambition: userDetails.Ambition,
        MobileNumber: userDetails.MobileNumber,
        AlternateMobileNumber: userDetails.AlternateMobileNumber,
        Email: userDetails.Email,
        ReferencedCoach: userDetails.ReferencedCoach
      },
      config
    )
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}

export const userUpdate = (userDetails, userLog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userLog.token}`
    }
  }
  return axios
    .post(
      'https://portfolio-api-node.herokuapp.com/api/Player/update',
      {
        UserId: userLog.userId,
        FirstName: userDetails.FirstName,
        LastName: userDetails.LastName,
        DateOfBirth: userDetails.DateOfBirth,
        Nationality: userDetails.Nationality,
        Height: userDetails.Height,
        Weight: userDetails.Weight,
        Position: userDetails.Position,
        Role: userDetails.Role,
        Foot: userDetails.Foot,
        Skills: userDetails.Skills,
        Agent: userDetails.Agent,
        Clubs: userDetails.Clubs,
        Ratings: userDetails.Ratings,
        Ambition: userDetails.Ambition,
        MobileNumber: userDetails.MobileNumber,
        AlternateMobileNumber: userDetails.AlternateMobileNumber,
        Email: userDetails.Email,
        ReferencedCoach: userDetails.ReferencedCoach
      },
      config
    )
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}
