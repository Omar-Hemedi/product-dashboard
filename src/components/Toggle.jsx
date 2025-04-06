import { Field, Label, Switch } from '@headlessui/react'
import { useState } from 'react'

export default function Toggle({ label = ''}) {
  const [enabled, setEnabled] = useState(false)

  return (
    <Field>
      <Label>
        {label}
      </Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group inline-flex h-6 ml-3 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-green-600"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
    </Field>
  )
}