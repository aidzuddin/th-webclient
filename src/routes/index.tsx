import { createFileRoute } from '@tanstack/react-router'
import { ComponentExample } from '@/components/component-example'
import PersonalInfoForm from '@/components/form/personal-info'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="container mx-auto flex flex-col gap-8 p-8">
      <PersonalInfoForm />
      {/* <ComponentExample /> */}
    </div>
  )
}
