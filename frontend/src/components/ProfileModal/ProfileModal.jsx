import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({modalOpened, setModalOpened, data}) {
  const theme = useMantineTheme();
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage,setCoverImage] = useState(null)
  const dispatch = useDispatch()
  const params = useParams()
  const user = useSelector((state) => state.authReducer.authData)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]) {
      let image = event.target.files[0]
      event.target.name === 'profileImage' ? setProfileImage(image) : setCoverImage(image)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let newUserData = formData
    if(profileImage) {
      const data = new FormData()
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName)
      data.append('file', profileImage)
      newUserData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    if(coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName)
      data.append('file', coverImage)
      newUserData.coverPicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(params.id, newUserData))
    setModalOpened(false)
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened = {modalOpened}
      onClose = {() => setModalOpened(false)}
    >
      {/* Modal content */}
      <form className='infoForm'>
        <h3>Your Info</h3>

        <div className="">
            <input type="text" placeholder='First Name' className="infoInput" name='firstname' onChange={handleChange} value={formData.firstname} />
            <input type="text" placeholder='Last Name' className="infoInput" name='lastname' onChange={handleChange} value={formData.lastname} />
        </div>
        <div>
            <input type="text" placeholder='Works At' className="infoInput" name='worksAt' onChange={handleChange} value={formData.worksAt} />
        </div>
        <div className="">
            <input type="text" placeholder='Lives In' className="infoInput" name='livesIn' onChange={handleChange} value={formData.livesIn} />
            <input type="text" placeholder='Country' className="infoInput" name='country' onChange={handleChange} value={formData.country} />
        </div>
        <div>
            <input type="text" placeholder='Relationship Status' className="infoInput" name='relationshipStatus' onChange={handleChange} value={formData.relationshipStatus} />
        </div>

        <div>
            Profile Image
            <input type="file" className="profileImg" name='profileImage' onChange={onImageChange} />
            Cover Image
            <input type="file" className="coverImg" name='coverImage' onChange={onImageChange}/>
        </div>

        <button className='button infoButton' onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal