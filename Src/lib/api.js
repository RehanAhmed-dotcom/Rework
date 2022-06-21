import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://intechsol-developer.co/ReWork/api/',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const login = payload => {
  console.log('payload going to login ', payload);
  const request = '/login';
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch login', e);
    });
};

const forgetpassword = payload => {
  const request = '/forget-password';
  console.log('payload in api forget password ......', payload);
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch forget password', e);
    });
};
const verifyotp = payload => {
  const request = '/otp-verify';
  console.log('payload going to Verify otp Api', payload);
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch otp', e);
    });
};
const passwordreset = payload => {
  console.log('payload of Reset password', payload);
  const request = '/reset-password';
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch password reset', e);
    });
};
const signup = payload => {
  const request = `/register`;
  console.log('payload going to register Api', JSON.stringify(payload));
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
    });
};
const CategoryList = payload => {
  const request = `/categoriesList`;
  console.log('payload going to Categoy List Api ', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const SkillsList = payload => {
  console.log('payload going to Skills List ', payload);
  const request = `/SkillsListWorker/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const GetCategoryName = payload => {
  console.log('payload going to Get Category Name ', payload);
  const request = `/specificCategory/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const CounterPlus = payload => {
  console.log('payload going to Counter plus  Api ', payload);
  const request = `/CounterDetailofJob/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const AddActiveToArchive = payload => {
  console.log('payload going to Active to Archive ', payload);
  const request = `/ActiveToArchieve/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const AddArchiveToActive = payload => {
  console.log('payload going to Archive  to Active ', payload);
  const request = `/ArchieveToActive/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const changepassword = payload => {
  const request = `/password-change`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch change password erroe', e);
    });
};
const SearchWorker = payload => {
  console.log('payload going to Search worker Api ', payload);
  const request = `/searchByEmployer`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch search worker Api', e);
    });
};
const Editprofile = (payload, data) => {
  console.log(
    ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
    JSON.stringify(data),
  );
  const request = `/editProfile`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch Edit Profile Error', e);
      throw e;
    });
};
const update = payload => {
  const request = `/update-fcmToken`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in update', e);
    });
};
const updateToken = payload => {
  const request = `/save-token`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Change Status Api Error', e);
    });
};

const ActiveOffers = payload => {
  const request = `/ActiveOffer`;
  console.log('payload going to active order list api', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const updateRedux = payload => {
  const request = `/update_redux`;
  console.log('payload going to active order list api', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const ActiveJobList = payload => {
  const request = `/ActiveJobsList`;
  console.log('payload going to active ActiveJobsList api', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const ArchiveJobList = payload => {
  const request = `/ArchieveJobsList`;
  console.log('payload going to active ArchieveJobsList api', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const CannceledOffers = payload => {
  const request = `/JobsCancelled`;
  console.log('payload going to cancel order list api', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const CompleatedOffers = payload => {
  const request = `/JobsCompleted`;
  console.log('payload going to compeate order list api', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
    });
};
const updateFcmToken = payload => {
  const request = `/update-token`;
  console.log('payload going to Update Fcm token', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Specific-product Details api error ', e);
    });
};
const Createjob = payload => {
  const request = `/creatingJob`;
  console.log('payload going to Create job api', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in crwatin job error ', e.response.data);
    });
};
const DeleteSkill = payload => {
  console.log('payload going to Delete Skill Api  ', payload);
  const request = `/WorkerSkillDelete/${payload.id}`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in skill delete Api ', e);
    });
};

const ChangePassword = payload => {
  const request = `/changePassword`;
  console.log('payload going to Change passsword Api ', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Change Password Api ', e);
    });
};
const AddSkill = payload => {
  const request = `/addSkills`;
  console.log('payload going to Add skill Api ', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in CAdd skill error Api ', e);
    });
};
const UpdateLocation = payload => {
  const request = `/updatelocation`;
  console.log('payload going to update Location Api ', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Update Location Api error  ', e);
    });
};
const getUser = payload => {
  const request = `/get-user`;
  console.log('payload going to update Location Api ', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in get user error  ', e);
    });
};
const JobListAccordingToSkill = payload => {
  const request = `/WorkerSkills`;
  console.log('payload going to job According to Skills Api  ', payload);
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in Job Accroding to Skill Api error ', e);
    });
};
const WorkerFilter = (payload, data) => {
  console.log('payload going to Filter Api  ', data);
  const request = `/filterWorker`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch Filter Api Error', e);
      throw e;
    });
};
const EmployerFilter = (payload, data) => {
  console.log('payload going to Filter Api Employer  ', data);
  const request = `/filterEmployer`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch Filter Employer Api Error', e);
      throw e;
    });
};
const PostRating = (payload, data) => {
  console.log('payload going to Post Rating Api ', JSON.stringify(data));
  const request = `/rating`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch  Post Rating Api ', e);
      throw e;
    });
};
export {
  EmployerFilter,
  JobListAccordingToSkill,
  DeleteSkill,
  AddSkill,
  update,
  SkillsList,
  Editprofile,
  signup,
  changepassword,
  updateToken,
  login,
  forgetpassword,
  verifyotp,
  passwordreset,
  CategoryList,
  ActiveOffers,
  CannceledOffers,
  CompleatedOffers,
  updateFcmToken,
  ArchiveJobList,
  ActiveJobList,
  updateRedux,
  Createjob,
  AddActiveToArchive,
  AddArchiveToActive,
  SearchWorker,
  ChangePassword,
  UpdateLocation,
  WorkerFilter,
  getUser,
  CounterPlus,
  PostRating,
  GetCategoryName,
};
