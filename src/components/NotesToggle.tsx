import {ChangeEvent, useCallback, useState } from 'react'
import Toggle from './Toggle.tsx';
import Heading from './Heading.tsx';
import { useTranslation } from 'react-i18next';
import Tooltip from './Tooltip.tsx';
import { sendMessage } from '../utils/factoryMethods.tsx';


export default function NotesToggle() {
  const [isOpenNote, setisOpenNote] = useState<boolean>(false)
  const [t] = useTranslation();

  const handleNotesToggle = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setisOpenNote((prev)=> !prev);
    let result = await sendMessage('addNotesDOM', e.target.checked);
    console.log('result in notes toggle', result);
  }, [isOpenNote])
  return (
    <div className='flex flex-row gap-3 items-center '>
      <Tooltip tooltip={isOpenNote ? 'ON' : 'OFF'}>
        <Toggle id='notes' isChecked={isOpenNote} name='name' onChange={handleNotesToggle} />
      </Tooltip>
      <Heading>{t('notes.notesTitle')}</Heading>
    </div>
  )
}
