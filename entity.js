'use strict'

export default class Entity {
  _properties = null
  _id = null
  _index = null
  constructor(properties, index = null) {
    this.patch(properties)
    this._index = index
    Object.keys(this._properties).forEach((key) => {
      this._define(key, this._properties[key])
    })
    delete this._properties._id
  }

  patch(properties) {
    this._properties = Object.assign({}, this._properties, properties)
    this._reid()
    this._redate()
  }

  static buildId(platform, id) {
    return `${platform}_${id}`
  }

  _reid() {
    this._id = Entity.buildId(this._properties.platform, this._properties.id)
  }

  _redate() {
    if (!this._properties.lastVisitedTime)
      this._properties.lastVisitedTime = new Date(0)
    if (!this._properties.lastChangedTime)
      this._properties.lastChangedTime = new Date()
    if (!this._properties.lastUpdatedTime)
      this._properties.lastUpdatedTime = new Date()
  }

  _define(key, val) {
    Object.defineProperty(this, key, {
      get() {
        return this._properties[key]
      },
      set(val) {
        if (val === this._properties[key]) return
        const old = this._properties[key]
        this._properties[key] = val
        this._reid()
      },
      enumerable: true,
    })
  }

  toJSON() {
    return this._properties
  }
}
