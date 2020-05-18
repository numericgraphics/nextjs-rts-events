import React, { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/eventLayout'

const signinWithNumber = async (number) => {
    const response = await fetch('/api/number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
    })

    if (response.status !== 200) {
        throw new Error(await response.text())
    }

    Router.push('/home')

    console.log('go to home page');
}

function Number() {
    const [userData, setUserData] = useState({
        number: '',
    })

    async function handleSubmit(event) {
        event.preventDefault()
        setUserData({ ...userData, error: '' })

        const number = userData.number

        try {
            await signinWithNumber(number)
        } catch (error) {
            console.error(error)
            setUserData({ ...userData, error: error.message })
        }
    }

    return (
        <Layout>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="number">Number</label>

                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={userData.number}
                        onChange={event =>
                            setUserData(
                                Object.assign({}, userData, { number: event.target.value })
                            )
                        }
                    />

                    <button type="submit">Send the Number receive</button>

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
