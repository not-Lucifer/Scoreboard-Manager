// numeric ids (same as the frontend) and send `id` instead of `_id`
export function numericId(schema) {
  schema.add({ _id: { type: Number, default: () => Date.now() * 1000 + Math.floor(Math.random() * 1000) } })
  schema.set('toJSON', {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.password
      return ret
    },
  })
}
