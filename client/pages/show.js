import { useRef, useState } from "react"
import { Form, Button, Message } from "semantic-ui-react"
import Layout from "../components/Layout"
import getContactByAddress from "../utils/getContactByAddress";

const ShowContact = () => {
    const [telegram, setTelegram] = useState()
    const [discord, setDiscord] = useState()
    const [desc, setDesc] = useState()
    const [isLoading, setLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    const addressRef = useRef()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const address = addressRef.current.value
        setErrorMessage("")
        setTelegram("")
        setDiscord("")
        setDesc("")
        
        if (!address) {
            setErrorMessage("Введите адрес пользователя")
            return
        }
        setLoading(true)
        try {
            const contact = await getContactByAddress(address)
            setTelegram(contact.telegram)
            setDiscord(contact.discord)
            setDesc(contact.desc)
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <Form error={!!errorMessage} onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Введите адрес здесь</label>
                    <input ref={addressRef} placeholder='Адрес' />
                </Form.Field>
                <Button loading={isLoading} primary type='submit'>Посмотреть</Button>
                <Message
                    error
                    header='Ошибка!'
                    content={errorMessage}
                />
            </Form>
            {telegram && <h2>Telegram: {telegram}</h2>}
            {discord && <h2>Discord: {discord}</h2>}
            {desc && <h2>Description: {desc}</h2>}
        </Layout>)
}

export default ShowContact