import { useState } from "react"
import { Button, Form, Input, Message } from "semantic-ui-react"
import Layout from "../components/Layout"
import contactFactory from "../contactFactory"
import provider from "../provider"

const AddContact = () => {
    const [telegram, setTelegram] = useState("")
    const [discord, setDiscord] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage("")
        setSuccessMessage("")
        if (!telegram) {
            setErrorMessage("Обязательно надо заполнить телеграм")
        } else {
            const signer = provider.getSigner()
            const contactFactoryWithSigner = contactFactory.connect(signer)
            console.log("func:", contactFactoryWithSigner.functions)
            try {
                let response
                if (discord) {
                    response = await contactFactoryWithSigner["createContact(string,string)"](telegram, discord)

                } else {
                    response = await contactFactoryWithSigner["createContact(string)"](telegram)
                }
                console.log("response:", response)
                setSuccessMessage("Хэш транзакции:" + response.hash)
            } catch (error) {
                console.error(error)
                setErrorMessage(error.message)
            }
        }
    }

    return (
        <Layout>
            <Form error={!!errorMessage} success={!!successMessage} onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='Telegram'
                        value={telegram}
                        onChange={event => setTelegram(event.target.value)}
                        placeholder='Введите здесь свой telegram'
                    />
                    <Form.Field
                        control={Input}
                        label='Discord'
                        value={discord}
                        onChange={event => setDiscord(event.target.value)}
                        placeholder='Введите здесь свой discord'
                    />
                </Form.Group>
                <Button primary>Сохранить</Button>
                <Message
                    error
                    header='Ошибка!'
                    content={errorMessage}
                    style={{ wordBreak: "break-word" }}
                />
                <Message
                    success
                    header='Успех!'
                    content={successMessage}
                />
            </Form>
        </Layout>)
}

export default AddContact