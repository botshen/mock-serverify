import { Card, CardBody, Heading, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

interface Props {
  name: string
  description: string
  image?: string
}
const ProjectCard = ({ name, description }: Props) => {
  const navigation = useNavigate()

  const handleCardClick = () => {
    navigation(name)
  }
  return (
    <Card
      borderRadius={10}
      overflow="hidden"
      cursor="pointer"
      onClick={handleCardClick}>
      <CardBody>
        <Heading fontSize="2xl">{name}</Heading>
        <Text>{description}</Text>
      </CardBody>
    </Card>
  )
}

export default ProjectCard
