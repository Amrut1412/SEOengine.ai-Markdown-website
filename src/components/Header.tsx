import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Link,
} from "@chakra-ui/react";
import { X, Menu } from "lucide-react";
import { MagnifyingGlass } from "@phosphor-icons/react";
// import ThemeToggle from "./ThemeToggle";
// import FontToggle from "./FontToggle";

const Links = [
  { name: "Features", href: "/features" },
  { name: "Case Studies", href: "/case-study" },
  { name: "Pricing", href: "/pricing" },
  { name: "Why", href: "/why" },
  { name: "About", href: "/about" },
  { name: "Examples", href: "/examples/saas" },
  { name: "Blog", href: "/blog" },
];

interface HeaderProps {
  openSearch: () => void;
}

export default function Header({ openSearch }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("white");

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setBgColor("white");
      } else {
        setBgColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      maxW={"9xl"}
      bg="#fff"
      top={0}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position="fixed"
      zIndex={50}
      width={"100%"}
    >
      <Box px={4} boxShadow="xs" mt={"3"} rounded={"2xl"} width={"95%"} bg="white">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box px="4">
            <Link href="/">
              <img
                src="/seologo.svg"
                alt="SEOengineLogo"
                style={{ height: 'auto', width: '230px' }}
              />
            </Link>
          </Box>

          {/* Desktop Nav */}
          <HStack gap={14} alignItems={"center"} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                px={2}
                py={1}
                fontWeight="800"
                fontSize={"18px"}
                color="#27272a"
                _hover={{ color: "#023E8A", textDecoration: "none" }}
                _focus={{ boxShadow: "none", outline: "none" }}
                _active={{ boxShadow: "none" }}
                textDecoration="none"
              >
                {link.name}
              </Link>
            ))}
          </HStack>

          {/* Desktop Buttons */}
          <HStack gap={2} display={{ base: "none", md: "flex" }}>
            <a href="https://app.seoengine.ai/login" target="_blank" rel="noopener noreferrer">
              <Button
                as="span"
                bg="#023E8A"
                rounded="full"
                size="sm"
                shadow={"sm"}
                fontWeight="600"
                _hover={{ bg: "#023E8A" }}
                cursor="pointer"
                px={4}
              >
                Try For Free
              </Button>
            </a>
            <a href="https://app.seoengine.ai/login" target="_blank" rel="noopener noreferrer">
              <Button
                as="span"
                variant="outline"
                bg="white"
                _hover={{ bg: "gray.50" }}
                shadow={"sm"}
                borderRadius="full"
                size="sm"
                fontWeight="600"
                borderColor="#023E8A"
                color="#023E8A"
                cursor="pointer"
                px={4}
              >
                Get started
              </Button>
            </a>
            <div className="desktop-controls desktop-only">
              {/* Search button with icon */}
              <button
                onClick={openSearch}
                className="search-button"
                aria-label="Search (⌘K)"
                title="Search (⌘K)"
              >
                <MagnifyingGlass size={18} weight="bold" />
              </button>
              {/* Font toggle */}
              {/* <FontToggle />
              <div className="theme-toggle-container">
                <ThemeToggle />
              </div> */}
            </div>
          </HStack>

          {/* Mobile Menu Toggle */}
          <IconButton
            size={"md"}
            bg="#F7F7EF"
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          >
            {isOpen ? <X color="#023E8A" /> : <Menu color="#023E8A" />}
          </IconButton>
        </Flex>

        {/* Mobile Nav */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} gap={4}>
              {Links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  px={2}
                  py={1}
                  fontWeight="500"
                  onClick={onClose}
                  _hover={{ color: "#023E8A", textDecoration: "none" }}
                  _focus={{ boxShadow: "none", outline: "none" }}
                  _active={{ boxShadow: "none" }}
                  textDecoration="none"
                >
                  {link.name}
                </Link>
              ))}
              <Button
                bg="#023E8A"
                _hover={{ bg: "#023E8A" }}
                rounded="full"
                w="full"
                fontWeight="600"
                onClick={() => window.open('https://app.seoengine.ai/login', '_blank')}
              >
                Try For Free
              </Button>
              <Button
                variant="outline"
                borderRadius="full"
                w="full"
                fontWeight="600"
                onClick={() => window.open('https://app.seoengine.ai/login', '_blank')}
              >
                Get started
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
