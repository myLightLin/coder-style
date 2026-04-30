Component({
  properties: {
    item: {
      type: Object,
      value: null
    },
    compact: {
      type: Boolean,
      value: false
    },
    actionText: {
      type: String,
      value: '查看细节'
    }
  },
  methods: {
    onTapCard() {
      this.triggerEvent('open', this.properties.item);
    }
  }
});
