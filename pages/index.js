import React, { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/eventLayout'

function Signup() {
    const [userData, setUserData] = useState({
        phone: '',
    })

    async function handleSubmit(event) {
        event.preventDefault()
        setUserData({ ...userData, error: '' })

        const phone = userData.phone

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            })

            if (response.status === 302) {
                Router.push('/number');
                return
            }

            if (response.status !== 200) {
                throw new Error(await response.text())
            }

            console.log('Page/Signup - response', response);
            Router.push('/home')

        } catch (error) {
            console.error(error)
            setUserData({ ...userData, error: error.message })
        }
    }

    return (
        <Layout>
            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="phone">Phone</label>

                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={event =>
                            setUserData(
                                Object.assign({}, userData, { phone: event.target.value })
                            )
                        }
                    />

                    <button type="submit">Login</button>

                    {userData.error && <p className="error">Error: {userData.error}</p>}
                </form>
            </div>
            <style jsx>{`
        .signup {
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

export default Signup
