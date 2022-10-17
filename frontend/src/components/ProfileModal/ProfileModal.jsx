import { Modal, useMantineTheme } from '@mantine/core';

function ProfileModal({modalOpened, setModalOpened}) {
  const theme = useMantineTheme();

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
            <input type="text" placeholder='First Name' className="infoInput" name='firstname' />
            <input type="text" placeholder='Last Name' className="infoInput" name='lastname' />
        </div>
        <div>
            <input type="text" placeholder='Works At' className="infoInput" name='worksat'/>
        </div>
        <div className="">
            <input type="text" placeholder='Lives In' className="infoInput" name='livesin' />
            <input type="text" placeholder='Country' className="infoInput" name='country' />
        </div>
        <div>
            <input type="text" placeholder='Relationship Status' className="infoInput" name='relationshipstatus' />
        </div>

        <div>
            Profile Image
            <input type="file" className="profileImg" name='profileImg' />
            Cover Image
            <input type="file" className="coverImg" name='coverImg' />
        </div>

        <button className='button infoButton'>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal