import useProtocolFeeRecipient from "@/hooks/useProtocolFeeRecipient"

const ProtocolFeeRecipient = () => {
  const { protocolFeeRecipient } = useProtocolFeeRecipient()
  return <div>ProtocolFeeRecipient: {protocolFeeRecipient}</div>
}

export default ProtocolFeeRecipient
