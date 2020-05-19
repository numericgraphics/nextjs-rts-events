import React, { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/eventLayout'

const signInWithCode = async (code) => {
    const response = await fetch('/api/number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
    });

    if (response.status !== 200) {
        Router.push('/');
        throw new Error(await response.text())
    }

    Router.push('/home');
};

function Number() {
    const [userData, setUserData] = useState({
        code: '',
    })

    async function handleSubmit(event) {
        event.preventDefault()
        setUserData({ ...userData, error: '' })

        const code = userData.code

        try {
            await signInWithCode(code)
        } catch (error) {
            console.error(error)
            setUserData({ ...userData, error: error.message })
        }
    }

    return (
        <Layout>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="code">Code</label>

                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={userData.code}
                        onChange={event =>
                            setUserData(
                                Object.assign({}, userData, { code: event.target.value })
                            )
                        }
                    />

                    <button type="submit">Send the code you receive</button>

                    {userData.error && <p className="error">Error: {userData.error}</p>}
                </form>
            </div>
            <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        form {
          display: flex;
          flex-flow: column;
        }

        label {
          font-weight: 600;
        }

        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      `}</style>
        </Layout>
    )
}

export default Number
