import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { usePageTitleContext } from '../../contexts/PageTitleContext'
import { useUserContext } from '../../contexts/UserContext'
import userStyles from './user.module.css'

interface UserFormProps {
    name: string,
    profileColor: string
}

export default function User(){
    const userContext = useUserContext();
    const pageTitleContext = usePageTitleContext();
    const router = useRouter();

    const [form, setForm] = useState<UserFormProps>({
        name: '',
        profileColor: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const setFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function SubmitForm(){
        if(form.name === '' || form.profileColor === ''){
            setErrorMessage('*Name and color must be filled out.')
        }
        else{
            userContext.setUserName(form.name);
            userContext.setProfileColor(form.profileColor);

            sessionStorage.setItem('userName', form.name);
            sessionStorage.setItem('profileColor', form.profileColor);
    
            router.push('/');
        }
    }

    useEffect(() => {
        pageTitleContext.setPageTitle('User');
    }, []);

    return(
        <>
            <div className={userStyles.form_container}>
                <h2>Basic info</h2>
                <input
                    placeholder="Name"
                    name="name"
                    value={form.name}
                    onChange={setFormValues}
                />
                <input 
                    placeholder="Profile Color"
                    name="profileColor"
                    value={form.profileColor}
                    onChange={setFormValues}
                />
                {errorMessage !== '' && <span className="error_message">{errorMessage}</span>}
                <button type="button" onClick={() => SubmitForm()}>Submit</button>
            </div>
        </>
    );
}